import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import '../../styles/Input.scss';
import '../../styles/ChooseLocationPage.scss';
import '../../styles/Spacing.scss';
import {useHistory} from "react-router-dom";
import {createLocation, getLocations} from "../../services/LocationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import Toggle from "./Toggle";
import LocationAutosuggest from "../shared/LocationAutosuggest";

const ChooseLocationPage = (props) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [nickname, setNickName] = useState('');
    const [locations, setLocations] = useState([]);
    const [saveThisAddress, setSaveThisAddress] = useState(false);

    let history = useHistory();

    useEffect(() => {
        getLocations()
            .then(locations => {
                setLocations(locations);
            });
    }, []);

    const handleClickSavedAddress = (locationId) => {
        const selectedLocation = locations.filter(location => {
            return location.id === locationId;
        })[0];

        props.onLocationChange(selectedLocation);
        history.push('/price-and-delivery');
    };

    const openEditLocationPageFor = (location) => {
        history.push('/edit-address', location);
    };

    const onAddressChange = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        setStreet(`${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`);
        setCity(suggestion.city);
        setState(suggestion.state);
        setZipCode(suggestion.zipCode);
    };

    const renderApplyButton = () => {
        return <span onClick={() => {
            props.onLocationChange({
                street: street,
                city: city,
                state: state,
                zipCode: zipCode
            });
            history.goBack();
        }}>Apply</span>
    };

    const handleClickConfirm = () => {
        createLocation({
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            nickname: nickname
        }).then((locationId) => {
            props.onLocationChange({
                id: locationId,
                street: street,
                city: city,
                state: state,
                zipCode: zipCode,
                nickname: nickname
            });
            history.push('/price-and-delivery');
        });
    };

    return (
        <div id='choose-location-page'>
            <PostItemTitleBar backLink="/price-and-delivery"
                              title='Location'
                              renderRightItem={renderApplyButton}
            />
            <label>Address*</label>
            <LocationAutosuggest onAddressChange={onAddressChange}/>
            <Toggle value={saveThisAddress} onChange={() => {
                setSaveThisAddress(!saveThisAddress);
            }}/>
            {saveThisAddress ?
                <div>
                    <div className='single-input-row'>
                        <label>Nick Name*</label>
                        <input type='text'
                               value={nickname}
                               onChange={(event => setNickName(event.target.value))}
                        />
                    </div>
                    <button onClick={handleClickConfirm}>Confirm</button>
                </div>
                : null
            }
            <div id='choose-location-saved-address'>
                <p>Or choose from your saved addresses</p>
                {locations.map(location => (
                    <div key={location.id} className='choose-location-saved-address-row'>
                        <div className='choose-location-select-area' onClick={
                            () => {
                                handleClickSavedAddress(location.id)
                            }}>
                            <span id='choose-location-saved-address-nickname'>{location.nickname}</span>
                            <span>{location.street}, {location.zipCode}</span>
                        </div>
                        <FontAwesomeIcon className='choose-location-saved-address-row-edit-button'
                                         icon={faEdit}
                                         onClick={() => {
                                             openEditLocationPageFor(location)
                                         }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

ChooseLocationPage.propTypes = {
    onLocationChange: PropTypes.func
};

export default ChooseLocationPage