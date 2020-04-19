import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import '../../styles/Input.scss';

const InputWithError = ({
  id, type, placeholder, shouldError, value, onChange, disabled,
}) => {
  const [displayError, setDisplayError] = useState(false);

  return (
    <div>
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
      />
      {displayError ? <ErrorMessage message="This field is required" /> : null}
    </div>
  );
};

InputWithError.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  shouldError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

InputWithError.defaultProps = {
  placeholder: '',
  disabled: false,
};

export default InputWithError;
