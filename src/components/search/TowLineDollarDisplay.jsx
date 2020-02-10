import PropTypes from 'prop-types';
import React from 'react';

const TowLineDollarDisplay = ({ amount, label }) => (
  <div>
    $
    {amount}
    {label}
  </div>
);

TowLineDollarDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default TowLineDollarDisplay;
