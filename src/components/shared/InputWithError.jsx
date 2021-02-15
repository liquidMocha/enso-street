import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import './InputWithError.scss';

const InputWithError = ({
  id, type, placeholder, shouldError, value, onChange, disabled, label, onEnter,
}) => {
  const [displayError, setDisplayError] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <label className="input-with-error" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input-field"
        data-lpignore="true"
        onChange={((event) => onChange(event.target.value))}
        onBlur={() => { setDisplayError(shouldError()); }}
        value={value}
        disabled={disabled}
        onKeyPress={handleKeyPress}
      />
      {displayError ? <ErrorMessage message="This field is required" /> : null}
    </label>
  );
};

InputWithError.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  shouldError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onEnter: PropTypes.func,
};

InputWithError.defaultProps = {
  placeholder: '',
  disabled: false,
  value: '',
  label: '',
  onEnter: () => {},
};

export default InputWithError;
