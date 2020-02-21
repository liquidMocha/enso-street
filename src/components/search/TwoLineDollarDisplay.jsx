import PropTypes from 'prop-types';
import React from 'react';
import './TwoLineDollarDisplay.scss';

const TwoLineDollarDisplay = ({ amount, label }) => (
  <div className="two-line-dollar-display">
    <span className="two-line-dollar-display__dollar-amount">
      $
      {amount}
    </span>
    <h5>{label}</h5>
  </div>
);

TwoLineDollarDisplay.propTypes = {
  amount: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TwoLineDollarDisplay;
