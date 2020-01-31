import PropTypes from 'prop-types';
import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import "../../styles/Input.scss";
import "./PriceAndDelivery.scss";
import RentalPriceInputSection from "./RentalPriceInputSection";
import DeliveryToggle from "./DeliveryToggle";
import DeliveryFeeInputSection from "./DeliveryFeeInputSection";
import ProgressBar from "./ProgressBar";
import LocationInput from "./LocationInput";

const PriceAndDelivery = (props) => {
    const item = props.item;

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
            <LocationInput
                chooseLocationPath='/choose-location'
                location={item.location}
            />
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
                <button id='preview-button'>
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