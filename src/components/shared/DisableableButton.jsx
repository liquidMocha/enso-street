import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const DisableableButton = ({
  onClick, buttonText, className, id,
}) => {
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const onClickButton = async () => {
    setDisplaySpinner(true);
    await onClick();
    setDisplaySpinner(false);
  };

  return (
    <button
      id={id}
      className={`dark-button ${className}`}
      type="button"
      onClick={onClickButton}
      disabled={displaySpinner}
    >
      {displaySpinner ? (
        <ClipLoader
          loading
          size={15}
        />
      ) : buttonText}
    </button>
  );
};

DisableableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

DisableableButton.defaultProps = {
  className: '',
};

export default DisableableButton;
