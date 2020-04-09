import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import '../../styles/Input.scss';
import './ChooseLocationPage.scss';
import '../../styles/Spacing.scss';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { createLocation, getLocations } from '../../services/LocationService';
import PostItemTitleBar from '../shared/PostItemTitleBar';
import Toggle from './Toggle';
import LocationAutosuggest from '../shared/LocationAutosuggest';
import ColoredButton from '../shared/ColoredButton';

const ChooseLocationPage = ({
  onLocationChange,
  exitPath,
  onChooseLocationToEdit,
}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [nickname, setNickName] = useState('');
  const [locations, setLocations] = useState([]);
  const [saveThisAddress, setSaveThisAddress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getLocations()
      .then((existingLocations) => {
        setLocations(existingLocations);
      });
  }, []);

  const handleClickSavedAddress = (locationId) => {
    const selectedLocation = locations.filter((location) => location.id === locationId)[0];

    onLocationChange(selectedLocation);
    history.push(exitPath);
  };

  const onAddressChange = (event, {
    suggestion, suggestionValue, suggestionIndex, sectionIndex, method,
  }) => {
    setStreet(`${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`);
    setCity(suggestion.city);
    setState(suggestion.state);
    setZipCode(suggestion.zipCode);
  };

  const renderApplyButton = () => (
    <span onClick={() => {
      onLocationChange({
        street, city, state, zipCode,
      });
      history.goBack();
    }}
    >
      Apply
    </span>
  );

  const handleClickConfirm = () => {
    createLocation({
      street, city, state, zipCode, nickname,
    }).then((locationId) => {
      onLocationChange({
        id: locationId, street, city, state, zipCode, nickname,
      });
      history.push(exitPath);
    });
  };

  return (
    <div id="choose-location-page">
      <PostItemTitleBar
        backLink={exitPath}
        title="Location"
        renderRightItem={renderApplyButton}
      />
      <label>Address*</label>
      <LocationAutosuggest onAddressChange={onAddressChange} />
      <Toggle
        value={saveThisAddress}
        onChange={() => {
          setSaveThisAddress(!saveThisAddress);
        }}
      />
      {saveThisAddress
        ? (
          <div>
            <div className="single-input-row">
              <label>Nick Name*</label>
              <input
                type="text"
                value={nickname}
                onChange={((event) => setNickName(event.target.value))}
              />
            </div>
            <ColoredButton buttonText="Confirm" mode="dark" onClick={handleClickConfirm} />
          </div>
        )
        : null}
      <div id="choose-location-saved-address">
        <p>Or choose from your saved addresses</p>
        {locations.map((location) => (
          <div key={location.id} className="choose-location-saved-address-row">
            <div
              className="choose-location-select-area"
              onClick={() => { handleClickSavedAddress(location.id); }}
            >
              <span id="choose-location-saved-address-nickname">{location.nickname}</span>
              <span>
                {location.street}
                ,
                {' '}
                {location.zipCode}
              </span>
            </div>
            <FontAwesomeIcon
              className="choose-location-saved-address-row-edit-button"
              icon={faEdit}
              onClick={() => {
                onChooseLocationToEdit(location);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ChooseLocationPage.propTypes = {
  exitPath: PropTypes.string.isRequired,
  onChooseLocationToEdit: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default ChooseLocationPage;
