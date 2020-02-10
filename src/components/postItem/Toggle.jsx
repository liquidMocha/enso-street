import React from 'react';
import '../../styles/Toggle.scss';
import PropTypes from 'prop-types';

const Toggle = ({ value, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={value} onChange={onChange} />
    <span className="slider round" />
  </label>
);

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Toggle;
