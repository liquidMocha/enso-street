import PropTypes from 'prop-types';
import React from 'react';
import './TwoLineDollarDisplay.scss';

const TwoLineDollarDisplay = ({ amount, label }) => (
  <div className="two-line-dollar-display">
    <span className="two-line-dollar-display__dollar-amount">
      $
      {amount.toFixed(0)}
    </span>
    <h5>{label}</h5>
  </div>
);

TwoLineDollarDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default TwoLineDollarDisplay;
