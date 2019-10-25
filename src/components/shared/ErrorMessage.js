import React from "react";
import '../../styles/ErrorMessage.scss';

const ErrorMessage = (prop) => {

    return (
        <div className='field-is-required'>{prop.message}</div>
    )
};

export default ErrorMessage;