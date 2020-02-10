import PropTypes from 'prop-types';
import React from 'react';
import DollarInput from '../shared/DollarInput';

const RentalPriceInputSection = ({
  rentalDailyPrice,
  onDailyRentalChange,
  deposit,
  onDepositChange,
}) => (
  <div id="price-section" className="horizontal-layout">
    <div>
      <label>Daily rental</label>
      <DollarInput
        value={rentalDailyPrice}
        onChange={(event) => {
          onDailyRentalChange(event.target.value);
        }}
      />
    </div>
    <div>
      <label>Deposit</label>
      <DollarInput
        value={deposit}
        onChange={(event) => {
          onDepositChange(event.target.value);
        }}
      />
    </div>
  </div>
);

RentalPriceInputSection.propTypes = {
  rentalDailyPrice: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
  onDailyRentalChange: PropTypes.func.isRequired,
  onDepositChange: PropTypes.func.isRequired,
};

export default RentalPriceInputSection;
