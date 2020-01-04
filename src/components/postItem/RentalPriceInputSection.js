import PropTypes from 'prop-types';
import React from "react";
import DollarInput from "../shared/DollarInput";

const RentalPriceInputSection = (props) => {
    return (
        <div id="price-section" className="horizontal-layout">
            <div>
                <label>Daily rental</label>
                <DollarInput
                    value={props.rentalDailyPrice}
                    onChange={(event) => {
                        props.onDailyRentalChange(event.target.value);
                    }}
                />
            </div>
            <div>
                <label>Deposit</label>
                <DollarInput
                    value={props.deposit}
                    onChange={(event) => {
                        props.onDepositChange(event.target.value);
                    }}
                />
            </div>
        </div>
    )
};

RentalPriceInputSection.propTypes = {
    rentalDailyPrice: PropTypes.number.isRequired,
    deposit: PropTypes.number.isRequired,
    onDailyRentalChange: PropTypes.func,
    onDepositChange: PropTypes.func
};

export default RentalPriceInputSection