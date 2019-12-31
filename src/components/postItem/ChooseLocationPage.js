import React, {useEffect, useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import '../../styles/Input.scss';
import '../../styles/ChooseLocationPage.scss';
import '../../styles/Spacing.scss';
import {useDispatch} from "react-redux";
import {updatePostedItemLocation} from "../../redux/postItemActions";
import {useHistory} from "react-router-dom";
import {autosuggestAddress, createLocation, getLocations} from "../../services/LocationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import Autosuggest from 'react-autosuggest';
import Toggle from "./Toggle";

const ChooseLocationPage = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [nickname, setNickName] = useState('');
    const [locations, setLocations] = useState([]);
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);
    const [addressValue, setAddressValue] = useState('');
    const [saveThisAddress, setSaveThisAddress] = useState(false);

    const dispatch = useDispatch();

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

        dispatch(updatePostedItemLocation(selectedLocation));
        history.push('/post-item/price-and-delivery');
    };

    const openEditLocationPageFor = (location) => {
        history.push('/post-item/price-and-delivery/choose-location/edit-address', location);
    };

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.houseNumber} {suggestion.street}, {suggestion.city}, {suggestion.state}, {suggestion.zipCode}</span>
        );
    }

    const onSuggestionsFetchRequested = ({value}) => {
        autosuggestAddress(value).then(addresses => {
            setSuggestedAddresses(addresses);
        }).catch(error => {
            console.error(error);
        })
    };

    const onSuggestionsClearRequested = () => {
        setSuggestedAddresses([]);
    };

    const getSuggestionValue = (suggestion) => {
        return `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}, ${suggestion.city}, ${suggestion.state}, ${suggestion.zipCode}`
    };

    const onAddressChange = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        setStreet(`${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`);
        setCity(suggestion.city);
        setState(suggestion.state);
        setZipCode(suggestion.zipCode);
    };

    const onAddressTyping = (event, {newValue, method}) => {
        setAddressValue(newValue);
    };

    const inputProps = {
        placeholder: 'Ex. West 22nd Street',
        value: addressValue,
        onChange: onAddressTyping
    };

    const renderApplyButton = () => {
        return <span onClick={() => {
            dispatch(updatePostedItemLocation({
                street: street,
                city: city,
                state: state,
                zipCode: zipCode
            }));
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
            dispatch(updatePostedItemLocation({
                id: locationId,
                street: street,
                city: city,
                state: state,
                zipCode: zipCode,
                nickname: nickname
            }));
            history.push('/post-item/price-and-delivery');
        });
    };

    return (
        <div id='choose-location-page'>
            <PostItemTitleBar backLink="/post-item/price-and-delivery" title='Location'
                              renderRightItem={renderApplyButton}/>
            <label>Address*</label>
            <Autosuggest
                suggestions={suggestedAddresses}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={onAddressChange}
                renderSuggestion={renderSuggestion}
                focusInputOnSuggestionClick={false}
                inputProps={inputProps}/>

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

export default ChooseLocationPage