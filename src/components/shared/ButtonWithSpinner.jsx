import PropTypes from 'prop-types';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const ButtonWithSpinner = ({ text, onClickingPost, displaySpinner }) => (
  <button
    className="preview-button"
    type="button"
    onClick={onClickingPost}
    disabled={displaySpinner}
  >
    {displaySpinner ? (
      <ClipLoader
        loading
        size={15}
      />
    ) : text}
  </button>
);

ButtonWithSpinner.propTypes = {
  text: PropTypes.string,
  onClickingPost: PropTypes.func.isRequired,
  displaySpinner: PropTypes.bool.isRequired,
};

ButtonWithSpinner.defaultProps = {
  text: '',
};

export default ButtonWithSpinner;
