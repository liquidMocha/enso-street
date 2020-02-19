import PropTypes from 'prop-types';
import React from 'react';
import './ColoredButton.scss';

const ColoredButton = ({
  id, className, buttonText, onClick, disabled, mode,
}) => (
  <button
    id={id}
    className={`${mode}-button ${className}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {buttonText}
  </button>
);

ColoredButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  mode: PropTypes.oneOf((['dark', 'light'])).isRequired,
};

ColoredButton.defaultProps = {
  disabled: false,
  id: null,
  className: '',
  onClick: () => {},
};

export default ColoredButton;
