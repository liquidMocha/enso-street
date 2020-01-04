import PropTypes from 'prop-types';
import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import "../../styles/Input.scss";
import "../../styles/PriceAndDelivery.scss";
import RentalPriceInputSection from "./RentalPriceInputSection";
import DeliveryToggle from "./DeliveryToggle";
import DeliveryFeeInputSection from "./DeliveryFeeInputSection";
import ProgressBar from "./ProgressBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const PriceAndDelivery = (props) => {
    const item = props.item;

    const displayLocation = () => {
        let result = '';
        if (item.location.street) {
            result += item.location.street;
        }
        if (item.location.zipCode) {
            result += `, ${item.location.zipCode}`;
        }
        return result;
    };

    return (
        <div>
            <PostItemTitleBar
                backLink="/details"
                title='Post Items'
                backLinkState={{item}}
            />
            <ProgressBar/>
            <RentalPriceInputSection
                deposit={item.deposit}
                rentalDailyPrice={item.rentalDailyPrice}
                onDailyRentalChange={props.onDailyRentalChange}
                onDepositChange={props.onDepositChange}
            />
            <div id='price-and-delivery-location-container'>
                <h3>Location</h3>
                <div id='price-and-delivery-location-input'>
                    <span>{displayLocation()}</span>
                    <Link to='/choose-location'>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                </div>
                <span className='deemphasize'>Public search will only show vague location of the item.</span>
            </div>
            <DeliveryToggle canBeDelivered={item.canBeDelivered}
                            updatePostedItemCanBeDelivered={props.onCanBeDeliveredChange}
            />
            {item.canBeDelivered ?
                <DeliveryFeeInputSection
                    deliveryStarting={item.deliveryStarting}
                    deliveryAdditional={item.deliveryAdditional}
                    onDeliveryStartingPriceChange={props.onDeliveryStartingPriceChange}
                    onDeliveryAdditionalPriceChange={props.onDeliveryAdditionalPriceChange}
                /> :
                null}
            <Link to='/preview'>
                <button id='preview-button' className='home-page-button'>
                    Preview
                </button>
            </Link>
        </div>
    )
};

PriceAndDelivery.propTypes = {
    item: PropTypes.any,
    onDailyRentalChange: PropTypes.func,
    onDepositChange: PropTypes.func,
    onCanBeDeliveredChange: PropTypes.func,
    onDeliveryStartingPriceChange: PropTypes.func,
    onDeliveryAdditionalPriceChange: PropTypes.func
};

export default PriceAndDelivery;