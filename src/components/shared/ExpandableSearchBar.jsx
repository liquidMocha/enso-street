import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InputWithIcon from './InputWithIcon';
import LocationAutosuggest from './LocationAutosuggest';
import SearchExpander from '../homepage/SearchExpander';
import {
  UPDATE_SEARCH_ADDRESS_ACTION,
  UPDATE_SEARCH_RESULTS_ACTION,
  UPDATE_SEARCH_TERM_ACTION,
  USE_ADDRESS_FOR_SEARCH_ACTION,
} from '../../redux/search/searchActions';
import * as SearchService from '../../services/SearchService';
import './ExpandableSearchBar.scss';
import ColoredButton from './ColoredButton';

const ExpandableSearchBar = ({ displayLocation }) => {
  const [searchExpanded, expandSearch] = useState(false);
  const searchTermInputElement = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchData.searchTerm);
  const coordinates = useSelector((state) => state.searchData.coordinates);
  const address = useSelector((state) => state.searchData.address);
  const useAddress = useSelector((state) => state.searchData.useAddress);

  const onAddressChange = (event, { suggestion }) => {
    dispatch(USE_ADDRESS_FOR_SEARCH_ACTION());
    dispatch(UPDATE_SEARCH_ADDRESS_ACTION({
      street: `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`,
      city: suggestion.city,
      state: suggestion.state,
      zipCode: suggestion.zipCode,
    }));
  };

  const onSearch = async (keyword, location) => {
    history.push('/search-result');

    const results = await SearchService.search(keyword, location);
    dispatch(UPDATE_SEARCH_RESULTS_ACTION(results));
  };

  const onClickingSearch = () => {
    if (searchTerm) {
      if (useAddress) {
        onSearch(searchTerm, { address: `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}` });
      } else {
        onSearch(searchTerm, coordinates);
      }
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
                  dispatch(UPDATE_SEARCH_TERM_ACTION(event.target.value));
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
};

ExpandableSearchBar.defaultProps = {
  displayLocation: '',
};

export default ExpandableSearchBar;