import React from "react";
import Toggle from "./Toggle";

const DeliveryToggle = (props) => {
    return (
        <div id='price-and-delivery-can-be-delivered-section'>
            <span className='bold'>This item can be delivered</span>
            <Toggle value={props.canBeDelivered}
                    onChange={props.updatePostedItemCanBeDelivered}/>
        </div>
    )
};

export default DeliveryToggle