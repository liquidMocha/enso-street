import React from "react";
import './InputWithIcon.scss';

const InputWithIcon = (props) => {
    return (
        <div className='input-with-icon'>
            {props.children}
        </div>
    )
};

export default InputWithIcon