import PropTypes from 'prop-types';
import React from "react";

const TowLineDollarDisplay = (props) => {
    return (
        <div>
            ${props.amount}
            {props.label}
        </div>
    )
};

TowLineDollarDisplay.propTypes = {
    amount: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
};

export default TowLineDollarDisplay