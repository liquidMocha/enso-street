import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    updatePostedItemCanBeDelivered,
    updatePostedItemDailyPrice,
    updatePostedItemDeliveryAdditional,
    updatePostedItemDeliveryStarting,
    updatePostedItemDeposit
} from "../../redux/postItemActions";
import "../../styles/Input.scss";
import "../../styles/PriceAndDelivery.scss";
import RentalPriceInputSection from "./RentalPriceInputSection";
import DeliveryToggle from "./DeliveryToggle";
import DeliveryFeeInputSection from "./DeliveryFeeInputSection";
import ProgressBar from "./ProgressBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const PriceAndDelivery = (props) => {
    const displayLocation = () => {
        let result = '';
        if (props.location.street) {
            result += props.location.street;
        }
        if (props.location.zipCode) {
            result += `, ${props.location.zipCode}`;
        }
        return result;
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/details" title='Post Items'/>
            <ProgressBar/>
            <RentalPriceInputSection/>
            <div id='price-and-delivery-location-container'>
                <h3>Location</h3>
                <div id='price-and-delivery-location-input'>
                    <span>{displayLocation()}</span>
                    <Link to='/post-item/price-and-delivery/choose-location'>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                </div>
                <span className='deemphasize'>Public search will only show vague location of the item.</span>
            </div>
            <DeliveryToggle canBeDelivered={props.canBeDelivered}
                            updatePostedItemCanBeDelivered={props.updatePostedItemCanBeDelivered}/>
            {props.canBeDelivered ? <DeliveryFeeInputSection/> : null}
            <Link to='/post-item/preview'>
                <button id='preview-button' className='home-page-button'>
                    Preview
                </button>
            </Link>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        dailyPrice: state.postedItem.rentalDailyPrice,
        deposit: state.postedItem.deposit,
        canBeDelivered: state.postedItem.canBeDelivered,
        deliveryStarting: state.postedItem.deliveryStarting,
        deliveryAdditional: state.postedItem.deliveryAdditional,
        location: state.postedItem.location
    }
};

const mapDispatchToProps = {
    updatePostedItemDailyPrice,
    updatePostedItemDeposit,
    updatePostedItemCanBeDelivered,
    updatePostedItemDeliveryStarting,
    updatePostedItemDeliveryAdditional
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceAndDelivery)