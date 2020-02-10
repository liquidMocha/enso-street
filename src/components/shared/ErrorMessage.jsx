import PropTypes from 'prop-types';
import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => (
  <div className="field-is-required">{message}</div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
