import PropTypes from 'prop-types';
import React from 'react';
import './DollarInput.scss';

const DollarInput = ({ onClick, value, onChange }) => (
  <span className="dollar-input" onClick={onClick}>
    <span>$</span>
    <input
      className="price-input"
      type="number"
      value={value}
      onChange={onChange}
    />
  </span>
);

DollarInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

DollarInput.defaultProps = {
  onClick: (event) => {
    event.stopPropagation();
  },
};

export default DollarInput;
