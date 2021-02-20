import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import InputWithIcon from './InputWithIcon';
import LocationAutosuggest from './LocationAutosuggest';
import SearchExpander from '../homepage/SearchExpander';
import {
  UPDATE_SEARCH_ADDRESS_ACTION,
  USE_ADDRESS_FOR_SEARCH_ACTION,
} from '../../redux/search/searchActions';
import './ExpandableSearchBar.scss';
import ColoredButton from './ColoredButton';

const ExpandableSearchBar = ({
  displayLocation, onSearchTermChanges, searchTerm, onSearch,
}) => {
  const [searchExpanded, expandSearch] = useState(false);
  const searchTermInputElement = useRef(null);

  const dispatch = useDispatch();

  const onAddressChange = (event, { suggestion }) => {
    dispatch(USE_ADDRESS_FOR_SEARCH_ACTION());
    dispatch(UPDATE_SEARCH_ADDRESS_ACTION({
      street: `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`,
      city: suggestion.city,
      state: suggestion.state,
      zipCode: suggestion.zipCode,
    }));
  };

  const onClickingSearch = () => {
    if (searchTerm) {
      onSearch();
    } else {
      searchTermInputElement.current.focus();
    }
  };

  return (
    <section className="expandable-search-bar">
      {searchExpanded
        ? (
          <>
            <InputWithIcon>
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Item name"
                onChange={(event) => {
                  onSearchTermChanges(event.target.value);
                }}
                value={searchTerm}
                ref={searchTermInputElement}
              />
            </InputWithIcon>
            <InputWithIcon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <LocationAutosuggest onAddressChange={onAddressChange} address={displayLocation} />
            </InputWithIcon>
            <ColoredButton buttonText="Search" mode="dark" onClick={onClickingSearch} />
          </>
        )
        : (
          <SearchExpander
            expandSearch={() => {
              expandSearch(true);
            }}
            displayValue={searchTerm}
          />
        )}
    </section>
  );
};

ExpandableSearchBar.propTypes = {
  displayLocation: PropTypes.string,
  onSearchTermChanges: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

ExpandableSearchBar.defaultProps = {
  displayLocation: '',
  searchTerm: '',
};

export default ExpandableSearchBar;
