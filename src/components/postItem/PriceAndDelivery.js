import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    updatePostedItemCanBeDelivered,
    updatePostedItemDailyPrice, updatePostedItemDeliveryAdditional, updatePostedItemDeliveryStarting,
    updatePostedItemDeposit
} from "../../redux/postItemActions";
import "../../styles/Input.scss";
import "../../styles/PriceAndDelivery.scss";
import DollarInput from "../shared/DollarInput";
import Toggle from "./Toggle";

const PriceAndDelivery = (props) => {
    const handleDailyRentalChange = (event) => {
        props.updatePostedItemDailyPrice(event.target.value);
    };

    const handleDepositChange = (event) => {
        props.updatePostedItemDeposit(event.target.value);
    };

    const handleDeliveryStartingPriceChange = (event) => {
        props.updatePostedItemDeliveryStarting(event.target.value);
    };

    const handleDeliveryAdditionalPriceChange = (event) => {
        props.updatePostedItemDeliveryAdditional(event.target.value);
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/details"/>
            <div id="price-section" className="horizontal-layout">
                <div>
                    <label>Daily rental</label>
                    <DollarInput
                        value={props.dailyPrice}
                        onChange={handleDailyRentalChange}
                    />
                </div>
                <div>
                    <label>Deposit</label>
                    <DollarInput
                        value={props.deposit}
                        onChange={handleDepositChange}
                    />
                </div>
            </div>
            <div id='price-and-delivery-can-be-delivered-section'>
                <span className='bold'>This item can be delivered</span>
                <Toggle value={props.canBeDelivered}
                        onChange={props.updatePostedItemCanBeDelivered}/>
            </div>
            {props.canBeDelivered ?
                <div id='price-and-delivery-fee-section'>
                    <div>
                        <DollarInput
                            value={props.deliveryStarting}
                            onChange={handleDeliveryStartingPriceChange}/>
                        <label>within 3 miles</label>
                    </div>
                    <div>
                        <DollarInput
                            value={props.deliveryAdditional}
                            onChange={handleDeliveryAdditionalPriceChange}/>
                        <label>per additional mile</label>
                    </div>
                </div>
                : null}
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