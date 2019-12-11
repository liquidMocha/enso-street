import React, {useEffect, useState} from "react";
import {getAllItemsForUser} from "../../../services/ItemService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import DollarInput from "../../shared/DollarInput";
import {faSave, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router-dom";
import "../../../styles/Spacing.scss";
import "../../../styles/MyItem.scss";

const MyItems = () => {
    const [items, setItems] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getAllItemsForUser()
            .then(result => {
                setItems(result.data.sort((a, b) => {
                    const timeA = a.createdOn;
                    const timeB = b.createdOn;
                    if (timeA > timeB) {
                        return -1;
                    } else if (timeA < timeB) {
                        return 1;
                    }
                    return 0;
                }));
            });
    }, []);

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
            {items.map(item => {
                return (
                    <div key={item.id} className='my-item-card'>
                        <div className='column-layout my-item-card-content'>
                            <div className='my-item-card-title'>{item.title}</div>
                            <div className='row-layout my-item-card-content-data'>
                                <img src={item.imageUrl} alt='item'/>
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
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            <FontAwesomeIcon icon={faSave}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default MyItems