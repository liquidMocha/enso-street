import PropTypes from 'prop-types';
import React from "react";
import DollarInput from "../shared/DollarInput";

const DeliveryFeeInputSection = (props) => {
    return (
        <div id='price-and-delivery-fee-section'>
            <div>
                <DollarInput
                    value={props.deliveryStarting}
                    onChange={(event) => {
                        props.onDeliveryStartingPriceChange(event.target.value);
                    }}/>
                <label>within 3 miles</label>
            </div>
            <div>
                <DollarInput
                    value={props.deliveryAdditional}
                    onChange={(event) => {
                        props.onDeliveryAdditionalPriceChange(event.target.value);
                    }}/>
                <label>per additional mile</label>
            </div>
        </div>
    )
};

DeliveryFeeInputSection.propTypes = {
    deliveryStarting: PropTypes.number,
    deliveryAdditional: PropTypes.number,
    onDeliveryStartingPriceChange: PropTypes.func,
    onDeliveryAdditionalPriceChange: PropTypes.func
};

export default DeliveryFeeInputSection