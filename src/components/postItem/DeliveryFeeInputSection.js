import React from "react";
import DollarInput from "../shared/DollarInput";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemDeliveryAdditional, updatePostedItemDeliveryStarting} from "../../redux/postItemActions";

const DeliveryFeeInputSection = () => {
    const dispatch = useDispatch();

    const deliveryStarting = useSelector(state => state.postedItem.deliveryStarting);
    const deliveryAdditional = useSelector(state => state.postedItem.deliveryAdditional);

    const handleDeliveryStartingPriceChange = (event) => {
        dispatch(updatePostedItemDeliveryStarting(event.target.value));
    };

    const handleDeliveryAdditionalPriceChange = (event) => {
        dispatch(updatePostedItemDeliveryAdditional(event.target.value));
    };

    return (
        <div id='price-and-delivery-fee-section'>
            <div>
                <DollarInput
                    value={deliveryStarting}
                    onChange={handleDeliveryStartingPriceChange}/>
                <label>within 3 miles</label>
            </div>
            <div>
                <DollarInput
                    value={deliveryAdditional}
                    onChange={handleDeliveryAdditionalPriceChange}/>
                <label>per additional mile</label>
            </div>
        </div>
    )
};

export default DeliveryFeeInputSection