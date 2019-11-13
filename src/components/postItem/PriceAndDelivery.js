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

const PriceAndDelivery = (props) => {
    const handleDailyRentalChange = (event) => {
        props.updatePostedItemDailyPrice(event.target.value);
    };

    const handleDepositChange = (event) => {
        props.updatePostedItemDeposit(event.target.value);
    };

    const handleItemSizeChange = (event) => {
        props.updatePostedItemSize(event.target.value);
    };

    return (
        <div>
            <PostItemTitleBar/>
            <div>
                <label>Daily rental</label>
                <span>$</span><input type='number' onChange={handleDailyRentalChange}/>
            </div>
            <div>
                <label>Deposit</label>
                <span>$</span><input type='number' onChange={handleDepositChange}/>
            </div>
            <div>
                <label>Item size</label>
                <select onChange={handleItemSizeChange}>
                    Please select a condition
                    <option value='small'>Small(can fit in a backpack)</option>
                    <option value='Medium'>Medium(can fit in the trunk of a sedan)</option>
                    <option value='Large'>Large(need bigger vehicle to transport)</option>
                </select>
            </div>
            <div>
                <label>Zip code</label>
                <input type='number'/>
            </div>
            <div>
                <label>This item can be delivered</label>
                <input type='radio'/>
            </div>
            <div>
                <div>
                    <label>Small</label>
                    <input type='number'/>
                </div>
                <div>
                    <label>Medium</label>
                    <input type='number'/>
                </div>
                <div>
                    <label>Large</label>
                    <input type='number'/>
                </div>
            </div>
            <Link to='/post-item/preview'>
                <button id='preview-button' className='home-page-button'>
                    Preview
                </button>
            </Link>
        </div>
    )
};
const mapDispatchToProps = {
    updatePostedItemDailyPrice,
    updatePostedItemDeposit,
    updatePostedItemSize,
    updatePostedItemCanBeDelivered
};

export default connect(null, mapDispatchToProps)(PriceAndDelivery)