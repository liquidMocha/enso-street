import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import InputWithIcon from '../shared/InputWithIcon';

const SearchExpander = ({ expandSearch, displayValue }) => (
  <div onClick={() => {
    expandSearch(true);
  }}
  >
    <InputWithIcon>
      <FontAwesomeIcon icon={faSearch} />
      <input
        placeholder="Search Enso Street"
        value={displayValue}
        readOnly
      />
    </InputWithIcon>
  </div>
);

SearchExpander.propTypes = {
  expandSearch: PropTypes.func.isRequired,
  displayValue: PropTypes.string.isRequired,
};

export default SearchExpander;
