import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import PostItemTitleBar from '../shared/PostItemTitleBar';
import InputWithError from '../shared/InputWithError';
import { updateLocation } from '../../services/LocationService';
import LocationAutosuggest from '../shared/LocationAutosuggest';
import ColoredButton from '../shared/ColoredButton';

const EditAddressPage = ({ location, pathAfterConfirm }) => {
  const initialAddress = location;
  const [nickname, setNickName] = useState(initialAddress.nickname);
  const [street, setStreet] = useState(initialAddress.street);
  const [city, setCity] = useState(initialAddress.city);
  const [state, setState] = useState({ value: initialAddress.state, label: initialAddress.state });
  const [zipCode, setZipCode] = useState(initialAddress.zipCode);

  const history = useHistory();

  const handleClickConfirm = () => {
    updateLocation({
      id: initialAddress.id, street, city, state: state.value, zipCode, nickname,
    }).then(() => {
      history.push(pathAfterConfirm);
    });
  };

  const onAddressChange = (event, {
    suggestion, suggestionValue, suggestionIndex, sectionIndex, method,
  }) => {
    setStreet(`${suggestion.houseNumber ? (`${suggestion.houseNumber} `) : ''}${suggestion.street}`);
    setCity(suggestion.city);
    setState(suggestion.state);
    setZipCode(suggestion.zipCode);
  };

  const locationAutosuggestInitialValue = () => {
    if (initialAddress) {
      return `${initialAddress.street}, ${initialAddress.city}, ${initialAddress.state}, ${initialAddress.zipCode}`;
    }
  };

  return (
    <div>
      <PostItemTitleBar
        backLink="/price-and-delivery/choose-location"
        title="Edit Address"
      />
      <InputWithError
        label="Nick Name*"
        type="text"
        value={nickname}
        onChange={setNickName}
        id="edit-address-page-nickname-input"
        shouldError={() => nickname === ''}
      />
      <label>Address*</label>
      <LocationAutosuggest
        onAddressChange={onAddressChange}
        address={locationAutosuggestInitialValue()}
      />
      <ColoredButton buttonText="Confirm" mode="dark" onClick={handleClickConfirm} />
    </div>
  );
};

EditAddressPage.propTypes = {
  location: PropTypes.any,
  pathAfterConfirm: PropTypes.string.isRequired,
};

export default EditAddressPage;
