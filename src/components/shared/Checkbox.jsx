import PropTypes from 'prop-types';
import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ checked, onChange }) => (
  <input
    className="enso-checkbox"
    type="checkbox"
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
