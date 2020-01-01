import React from "react";
import DollarInput from "../../shared/DollarInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTrashAlt} from "@fortawesome/free-regular-svg-icons";

const MyItemCard = (props) => {
    return (
        <div key={props.item.id} className='my-item-card'>
            <div className='column-layout my-item-card-content'>
                <div className='my-item-card-title'>{props.item.title}</div>
                <div className='row-layout my-item-card-content-data'>
                    <div className='my-item-image-container'>
                        <img src={props.item.imageUrl} alt='item'/>
                    </div>
                    <div className='column-layout'>
                        <div className='my-item-card-rental-price'>
                            <DollarInput value={props.item.rentalDailyPrice}
                                         onChange={(event) => {
                                             props.onChangeRentalDailyPrice(event, props.item.id);
                                         }}
                                         description='per day'/>
                        </div>
                        <div>
                            <input type='checkbox'
                                   checked={props.item.searchable || false}
                                   onChange={(() => {
                                       props.onChangeSearchability(props.item.id);
                                   })}
                            /> Show on site
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-item-card-buttons column-layout'>
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => {
                    props.onDelete(props.item.id)
                }}/>
                <FontAwesomeIcon icon={faSave} onClick={() => {
                    props.onSave(props.item)
                }}
                />
            </div>
        </div>
    )
};

export default MyItemCard