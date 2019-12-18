import React, {useEffect, useState} from "react";
import {deleteItem, getAllItemsForUser} from "../../../services/ItemService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faSearch} from "@fortawesome/free-solid-svg-icons";
import DollarInput from "../../shared/DollarInput";
import {faSave, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router-dom";
import Modal from 'react-modal';
import "../../../styles/Spacing.scss";
import "../../../styles/MyItem.scss";
import "../../../styles/Input.scss";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModalStatus, setDeleteModalStatus] = useState({
        isOpen: false, itemId: ''
    });

    let history = useHistory();

    useEffect(() => {
        getAllItemsForUser()
            .then(result => {
                let sortedItems = result.data.sort(byCreatedOn);
                setItems(sortedItems);
                setVisibleItems(sortedItems);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.length !== 0) {
            setVisibleItems(filterItemBySearchTerm(items))
        } else {
            setVisibleItems(items);
        }
    }, [searchTerm, items]);

    const filterItemBySearchTerm = (items) => {
        return items.filter(item => {
            return item.title.toLowerCase().includes(searchTerm) ||
                (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                (item.location &&
                    (
                        (item.location.street && item.location.street.toLowerCase().includes(searchTerm)) ||
                        (item.location.zipCode && item.location.zipCode.toLowerCase().includes(searchTerm)) ||
                        (item.location.city && item.location.city.toLowerCase().includes(searchTerm)) ||
                        (item.location.state && item.location.state.toLowerCase().includes(searchTerm)) ||
                        (item.location.nickname && item.location.nickname.toLowerCase().includes(searchTerm))
                    ));
        })
    };

    const byCreatedOn = (a, b) => {
        const timeA = a.createdOn;
        const timeB = b.createdOn;
        if (timeA > timeB) {
            return -1;
        } else if (timeA < timeB) {
            return 1;
        }
        return 0;
    };

    const deleteItemById = (itemId) => {
        deleteItem(itemId).then(() => {
            const itemsLeft = items.filter(existingItem => {
                return existingItem.id !== itemId
            });
            setItems(itemsLeft);
        })
    };

    return (
        <div>
            <div className='fixed-title-bar'>
                <span onClick={() => {
                    history.push('/menu')
                }}>
                    <FontAwesomeIcon icon={faAngleLeft}/> Back
                </span>
                <span className='fixed-title-bar__title--font'>My Items</span>
                <span/>
            </div>
            <div id='my-items-search'>
                <input type='text'
                       className='input-field'
                       placeholder='Search my item'
                       onChange={(event => {
                           setSearchTerm(event.target.value.toLocaleLowerCase());
                       })}
                />
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            {visibleItems.map(item => {
                return (
                    <div key={item.id} className='my-item-card'>
                        <div className='column-layout my-item-card-content'>
                            <div className='my-item-card-title'>{item.title}</div>
                            <div className='row-layout my-item-card-content-data'>
                                <div className='my-item-image-container'>
                                    <img src={item.imageUrl} alt='item'/>
                                </div>
                                <div className='column-layout'>
                                    <div className='my-item-card-rental-price'>
                                        <DollarInput value={item.rentalDailyPrice} description='per day'/>
                                    </div>
                                    <div>
                                        <input type='checkbox'/> Show on site
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-item-card-buttons column-layout'>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {
                                setDeleteModalStatus({isOpen: true, itemId: item.id});
                            }}/>
                            <FontAwesomeIcon icon={faSave}/>
                        </div>
                    </div>
                )
            })}
            <Modal isOpen={deleteModalStatus.isOpen}
                   className='delete-item-modal'
                   overlayClassName="delete-item-modal-overlay">
                <div>Are you sure you want to delete this item?</div>
                <div className='modal-button-group'>
                    <div onClick={() => {
                        deleteItemById(deleteModalStatus.itemId);
                        setDeleteModalStatus({isOpen: false, itemId: ''});
                    }}>Delete
                    </div>
                    <div onClick={() => {
                        setDeleteModalStatus({isOpen: false, itemId: ''})
                    }}>Cancel
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default MyItems