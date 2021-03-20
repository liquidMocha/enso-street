import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RentalDate = ({
  rentDate, returnDate, onRentDateChange, onReturnDateChange,
}) => (
  <section className="rental-date-selection">
    <h1>Rental Date</h1>
    <section>
      <label>
        Start
        <DatePicker
          className="rental-date-selection__date-picker"
          selected={rentDate}
          onChange={(date) => onRentDateChange(date)}
          showTimeSelect
          timeFormat="HH"
          timeIntervals={60}
          timeCaption="Hour"
          dateFormat="MMMM d, yyyy h aa"
        />
      </label>
    </section>
    <section>
      <label>
        Return
        <DatePicker
          className="rental-date-selection__date-picker"
          selected={returnDate}
          onChange={(date) => onReturnDateChange(date)}
          showTimeSelect
          timeFormat="HH"
          timeIntervals={60}
          timeCaption="Hour"
          dateFormat="MMMM d, yyyy h aa"
          minDate={rentDate}
        />
      </label>
    </section>
  </section>
);
RentalDate.propTypes = {
  rentDate: PropTypes.instanceOf(Date).isRequired,
  onRentDateChange: PropTypes.func.isRequired,
  returnDate: PropTypes.instanceOf(Date).isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
};


export default RentalDate;
