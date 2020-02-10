import PropTypes from 'prop-types';
import React from 'react';

const DescriptionTextInput = ({ description, onDescriptionChange }) => {
  const handleDescriptionChange = (event) => {
    onDescriptionChange(event.target.value);
  };

  const descriptionPlaceholder = "Ex. Size 53'' * 30'' * 45'' LWH";

  return (
    <div>
      <label>Description (optional)</label>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder={descriptionPlaceholder}
        maxLength={2500}
      />
    </div>
  );
};

DescriptionTextInput.propTypes = {
  description: PropTypes.string.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
};

export default DescriptionTextInput;
