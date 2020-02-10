import PropTypes from 'prop-types';
import React from 'react';
import './InputWithIcon.scss';

const InputWithIcon = ({ children }) => (
  <div className="input-with-icon">
    {children}
  </div>
);

InputWithIcon.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default InputWithIcon;
