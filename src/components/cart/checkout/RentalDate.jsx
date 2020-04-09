import PropTypes from 'prop-types';
import React from 'react';

const RentalDate = ({
  rentDate, returnDate, onRentDateChange, onReturnDateChange,
}) => (
  <div>
    Rental Date
    <section>
      <label htmlFor="checkout-rent-date">Start</label>
      <input
        id="checkout-rent-date"
        type="datetime-local"
        value={rentDate}
        onChange={(e) => onRentDateChange(e.target.value)}
      />
      <br />
      <label htmlFor="checkout-return-date">End</label>
      <input
        id="checkout-return-date"
        type="datetime-local"
        value={returnDate}
        onChange={(e) => onReturnDateChange(e.target.value)}
      />
    </section>
  </div>
);

RentalDate.propTypes = {
  rentDate: PropTypes.instanceOf(Date).isRequired,
  onRentDateChange: PropTypes.func.isRequired,
  returnDate: PropTypes.instanceOf(Date).isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
};


export default RentalDate;
