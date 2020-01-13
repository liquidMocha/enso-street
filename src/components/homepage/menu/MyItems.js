import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import {deleteItem, getAllItemsForUser, updateItem} from "../../../services/ItemService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import Modal from 'react-modal';
import "../../../styles/Spacing.scss";
import "../../../styles/MyItem.scss";
import "../../../styles/Input.scss";
import {toast} from "react-toastify";
import MyItemCard from "./MyItemCard";
import MyItemCardSkeleton from "./MyItemCardSkeleton";

const MyItems = (props) => {
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModalStatus, setDeleteModalStatus] = useState({
        isOpen: false, itemId: ''
    });

    let history = useHistory();

    useEffect(() => {
        getAllItemsForUser()
            .then(items => {
                let sortedItems = items.sort(byCreatedOn);
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

    const deleteItemById = async (itemId) => {
        await deleteItem(itemId);
        const itemsLeft = items.filter(existingItem => {
            return existingItem.id !== itemId
        });

        setItems(itemsLeft);
    };

    const onItemSave = (item) => {
        toast.success('Item save successful!');
        updateItem({
            id: item.id,
            rentalDailyPrice: item.rentalDailyPrice,
            searchable: item.searchable
        }).then(() => {
            console.log('updated')
        });
    };

    const onItemDelete = (itemId) => {
        setDeleteModalStatus({isOpen: true, itemId: itemId});
    };

    const onChangeRentalDailyPrice = (event, itemId) => {
        let newItems = items.slice(0);
        let newItem = newItems.find(updatedItem => {
            return updatedItem.id === itemId;
        });
        newItem.rentalDailyPrice = event.target.value;
        setItems(newItems);
    };

    const onChangeSearchability = (itemId) => {
        let newItems = items.slice(0);
        let newItem = newItems.find(updatedItem => {
            return updatedItem.id === itemId;
        });
        newItem.searchable = !newItem.searchable;
        setItems(newItems);
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
                <span onClick={() => {
                    history.push('/post-item')
                }}><FontAwesomeIcon icon={faPlus}/>Add</span>
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
            {visibleItems.length === 0 ?
                <>
                    <MyItemCardSkeleton/>
                    <MyItemCardSkeleton/>
                    <MyItemCardSkeleton/>
                </> :
                visibleItems.map(item => {
                    return (<MyItemCard key={item.id}
                                        item={item}
                                        onDelete={onItemDelete}
                                        onSave={onItemSave}
                                        onChangeRentalDailyPrice={onChangeRentalDailyPrice}
                                        onChangeSearchability={onChangeSearchability}
                                        onCardClick={props.onClickItemCard}
                        />
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

MyItems.propTypes = {
    onClickItemCard: PropTypes.func
};

export default MyItems