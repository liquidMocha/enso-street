import React from "react";
import "../../styles/DollarInput.scss";

const DollarInput = (props) => {
    return (
        <div className='dollar-input'>
            <span>$</span><input className='price-input' type='number'
                                 value={props.value}
                                 onChange={props.onChange}/>
        </div>
    )
};

export default DollarInput