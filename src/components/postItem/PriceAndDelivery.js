import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    updatePostedItemCanBeDelivered,
    updatePostedItemDailyPrice,
    updatePostedItemDeposit,
    updatePostedItemSize
} from "../../redux/postItemActions";
import "../../styles/Input.scss";
import "../../styles/PriceAndDelivery.scss";
import Select from 'react-select';

const PriceAndDelivery = (props) => {
    const handleDailyRentalChange = (event) => {
        props.updatePostedItemDailyPrice(event.target.value);
    };

    const handleDepositChange = (event) => {
        props.updatePostedItemDeposit(event.target.value);
    };

    const handleItemSizeChange = (selected) => {
        props.updatePostedItemSize(selected);
    };

    const sizeOptions = [
        {value: 'small', label: 'Small (can fit in a backpack)'},
        {value: 'medium', label: 'Medium (can fit in the trunk of a sedan)'},
        {value: 'large', label: 'Large (need bigger vehicle to transport)'}
    ];

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/details"/>
            <div id="price-section" className="horizontal-layout">
                <div>
                    <label>Daily rental</label>
                    <input className='price-input' type='number' value={props.dailyPrice} onChange={handleDailyRentalChange}/>
                </div>
                <div>
                    <label>Deposit</label>
                    <input className='price-input' type='number' value={props.deposit} onChange={handleDepositChange}/>
                </div>
            </div>
            <div>
                <label>Item size</label>
                <Select
                    onChange={handleItemSizeChange}
                    options={sizeOptions}
                    value={props.size}
                />
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
        size: state.postedItem.itemSize
    }
};

const mapDispatchToProps = {
    updatePostedItemDailyPrice,
    updatePostedItemDeposit,
    updatePostedItemSize,
    updatePostedItemCanBeDelivered
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceAndDelivery)