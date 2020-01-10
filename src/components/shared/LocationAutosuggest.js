import React, {useState} from "react";
import Autosuggest from "react-autosuggest";
import {autosuggestAddress} from "../../services/LocationService";
import PropTypes from 'prop-types';

const LocationAutosuggest = (props) => {
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);
    const [addressValue, setAddressValue] = useState(props.address || '');

    const onSuggestionsFetchRequested = async ({value}) => {
        const suggestedAddresses = await autosuggestAddress(value);
        setSuggestedAddresses(suggestedAddresses);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestedAddresses([]);
    };

    const getSuggestionValue = (suggestion) => {
        return `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}, ${suggestion.city}, ${suggestion.state}, ${suggestion.zipCode}`
    };

    const onAddressTyping = (event, {newValue}) => {
        setAddressValue(newValue);
    };

    const inputProps = {
        placeholder: 'Ex. West 22nd Street',
        value: addressValue,
        onChange: onAddressTyping
    };

    const renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.houseNumber} {suggestion.street}, {suggestion.city}, {suggestion.state}, {suggestion.zipCode}</span>
        );
    };

    return (
        <Autosuggest
            suggestions={suggestedAddresses}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={props.onAddressChange}
            renderSuggestion={renderSuggestion}
            focusInputOnSuggestionClick={false}
            inputProps={inputProps}
        />
    )
};

LocationAutosuggest.propTypes = {
    onAddressChange: PropTypes.func,
    address: PropTypes.string
};

export default LocationAutosuggest