import PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(() => {
      onChange();
    })}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
