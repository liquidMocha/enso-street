import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const conditionOptions = [
  { value: 'like-new', label: 'Like New' },
  { value: 'normal-wear', label: 'Normal Wear' },
  { value: 'functional', label: 'Functional' },
];

const ConditionSelect = ({ condition, onConditionChange }) => {
  const handleConditionChange = (selected) => {
    onConditionChange(selected);
  };

  return (
    <div>
      <label>Condition</label>
      <Select
        onChange={handleConditionChange}
        options={conditionOptions}
        value={condition}
        isSearchable={false}
      />
    </div>
  );
};

ConditionSelect.propTypes = {
  condition: PropTypes.shape(
    { value: PropTypes.string, label: PropTypes.string },
  ).isRequired,
  onConditionChange: PropTypes.func.isRequired,
};

export default ConditionSelect;
