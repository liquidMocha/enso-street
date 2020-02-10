import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { autosuggestAddress } from '../../services/LocationService';

const LocationAutosuggest = ({ address, onAddressChange }) => {
  const coordinates = useSelector((state) => state.currentLocation);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [addressValue, setAddressValue] = useState(address);

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestedAddresses(await autosuggestAddress(value, coordinates));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestedAddresses([]);
  };

  const getSuggestionValue = (suggestion) => `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}, ${suggestion.city}, ${suggestion.state}, ${suggestion.zipCode}`;

  const onAddressTyping = (event, { newValue }) => {
    setAddressValue(newValue);
  };

  const inputProps = {
    placeholder: 'Ex. West 22nd Street',
    value: addressValue,
    onChange: onAddressTyping,
  };

  const renderSuggestion = (suggestion) => (
    <span>
      {suggestion.houseNumber}
      {' '}
      {suggestion.street}
      ,
      {' '}
      {suggestion.city}
      ,
      {' '}
      {suggestion.state}
      ,
      {' '}
      {suggestion.zipCode}
    </span>
  );

  return (
    <Autosuggest
      suggestions={suggestedAddresses}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={onAddressChange}
      renderSuggestion={renderSuggestion}
      focusInputOnSuggestionClick={false}
      inputProps={inputProps}
    />
  );
};

LocationAutosuggest.propTypes = {
  onAddressChange: PropTypes.func.isRequired,
  address: PropTypes.string,
};

LocationAutosuggest.defaultProps = {
  address: '',
};

export default LocationAutosuggest;
