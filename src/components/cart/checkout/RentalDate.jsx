import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RentalDate = ({
  rentDate, returnDate, onRentDateChange, onReturnDateChange,
}) => (
  <section>
    <h1>Rental Date</h1>
    <section>
      <label>Start</label>
      <DatePicker
        selected={rentDate}
        onChange={(date) => onRentDateChange(date)}
        showTimeSelect
        timeFormat="HH"
        timeIntervals={60}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h aa"
      />
      <br />
      <label>Return</label>
      <DatePicker
        selected={returnDate}
        onChange={(date) => onReturnDateChange(date)}
        showTimeSelect
        timeFormat="HH"
        timeIntervals={60}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h aa"
        minDate={rentDate}
      />
    </section>
  </section>
);
RentalDate.propTypes = {
  rentDate: PropTypes.string.isRequired,
  onRentDateChange: PropTypes.func.isRequired,
  returnDate: PropTypes.string.isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
};


export default RentalDate;
