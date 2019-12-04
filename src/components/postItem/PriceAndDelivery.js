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

const PriceAndDelivery = (props) => {
    return (
        <div>
            <PostItemTitleBar backLink="/post-item/details"/>
            <RentalPriceInputSection/>
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
        deliveryAdditional: state.postedItem.deliveryAdditional
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