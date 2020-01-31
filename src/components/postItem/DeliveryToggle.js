import PropTypes from 'prop-types';
import React from "react";
import Toggle from "./Toggle";
import '../../styles/font.scss';

const DeliveryToggle = (props) => {
    return (
        <div id='price-and-delivery-can-be-delivered-section'>
            <span className='bold'>This item can be delivered</span>
            <Toggle value={props.canBeDelivered}
                    onChange={props.updatePostedItemCanBeDelivered}/>
        </div>
    )
};

DeliveryToggle.propTypes = {
    canBeDelivered: PropTypes.bool,
    updatePostedItemCanBeDelivered: PropTypes.func
};

export default DeliveryToggle