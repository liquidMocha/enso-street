import PropTypes from 'prop-types';
import React from "react";
import DollarInput from "../../shared/DollarInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import './MyItemCard.scss';

const MyItemCard = (props) => {
    return (
        <div key={props.item.id}
             className='my-item-card'
             onClick={() => {
                 props.onCardClick(props.item);
             }}
        >
            <div className='column-layout my-item-card-content'>
                <h1 className='my-item-card-title'>{props.item.title}</h1>
                <div className='row-layout my-item-card-content-data'>
                    <div className='my-item-image-container'>
                        <img src={props.item.imageUrl} alt='item'/>
                    </div>
                    <div className='column-layout my-item-card-second-column'>
                        <div className='my-item-card-rental-price'>
                            <DollarInput value={props.item.rentalDailyPrice}
                                         onClick={(event) => {
                                             event.stopPropagation();
                                         }}
                                         onChange={(event) => {
                                             props.onChangeRentalDailyPrice(event, props.item.id);
                                         }}
                            /><h5>per day</h5>
                        </div>
                        <span className='my-item-card-show-on-site' onClick={(event => event.stopPropagation())}>
                            <input type='checkbox'
                                   checked={props.item.searchable || false}
                                   onChange={(() => {
                                       props.onChangeSearchability(props.item.id);
                                   })}
                            />
                            Show on site
                        </span>
                    </div>
                </div>
            </div>
            <div className='my-item-card-buttons column-layout'>
                <FontAwesomeIcon icon={faTrashAlt} onClick={(event) => {
                    event.stopPropagation();
                    props.onDelete(props.item.id)
                }}/>
                <FontAwesomeIcon icon={faSave} onClick={(event) => {
                    event.stopPropagation();
                    props.onSave(props.item)
                }}
                />
            </div>
        </div>
    )
};

MyItemCard.propTypes = {
    onCardClick: PropTypes.func
};

export default MyItemCard