import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    updatePostedItemCanBeDelivered,
    updatePostedItemDailyPrice,
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
        canBeDelivered: state.postedItem.canBeDelivered
    }
};

const mapDispatchToProps = {
    updatePostedItemDailyPrice,
    updatePostedItemDeposit,
    updatePostedItemCanBeDelivered
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceAndDelivery)