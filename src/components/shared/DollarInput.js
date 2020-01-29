import React from "react";
import "../../styles/DollarInput.scss";

const DollarInput = (props) => {
    return (
        <span className='dollar-input' onClick={props.onClick}>
            <span>$</span>
            <input className='price-input' type='number'
                   value={props.value}
                   onChange={props.onChange}/>
        </span>
    )
};

export default DollarInput