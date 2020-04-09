import PropTypes from 'prop-types';
import React from 'react';

const RentalDate = ({
  rentDate, returnDate, onRentDateChange, onReturnDateChange,
}) => {
  return (
    <div>
      Rental Date
      <section>
        <label htmlFor="checkout-rent-date">Start</label>
        <input
          id="checkout-rent-date"
          type="datetime-local"
          value={rentDate}
          onChange={(e) => onRentDateChange(e.target.value)}
          step={30 * 60}
        />
        <br />
        <label htmlFor="checkout-return-date">End</label>
        <input
          id="checkout-return-date"
          type="datetime-local"
          value={returnDate}
          onChange={(e) => onReturnDateChange(e.target.value)}
          min={rentDate}
          step={30 * 60}
        />
      </section>
    </div>
  );
};

RentalDate.propTypes = {
  rentDate: PropTypes.string.isRequired,
  onRentDateChange: PropTypes.func.isRequired,
  returnDate: PropTypes.string.isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
};


export default RentalDate;
