import React, {useEffect, useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import '../../styles/Input.scss';
import '../../styles/ChooseLocationPage.scss';
import {useDispatch} from "react-redux";
import {updatePostedItemLocation} from "../../redux/postItemActions";
import {useHistory} from "react-router-dom";
import {autosuggestAddress, createLocation, getLocations} from "../../services/LocationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import AddressSecondRow from "./AddressSecondRow";

const ChooseLocationPage = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [nickname, setNickName] = useState('');
    const [locations, setLocations] = useState([]);
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);

    const dispatch = useDispatch();

    let history = useHistory();

    useEffect(() => {
        getLocations()
            .then(locations => {
                setLocations(locations);
            });
    }, []);

    const handleStateChange = (option) => {
        setState(option);
    };

    const handleClickConfirm = () => {
        createLocation({
            street: street,
            city: city,
            state: state.value,
            zipCode: zipCode,
            nickname: nickname
        }).then((locationId) => {
            dispatch(updatePostedItemLocation({
                id: locationId,
                street: street,
                city: city,
                state: state.value,
                zipCode: zipCode,
                nickname: nickname
            }));
            history.push('/post-item/price-and-delivery');
        });
    };

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

    return (
        <div id='choose-location-page'>
            <PostItemTitleBar backLink="/post-item/price-and-delivery" title='Location'/>
            <label>Autosuggest Address</label>
            <input type='text' placeholder='type here and wait for autosuggest' onChange={(event) => {
                const searchTerm = event.target.value;
                autosuggestAddress(searchTerm).then(addresses => {
                    console.log(addresses);
                    setSuggestedAddresses(addresses);
                }).catch(error => {
                    console.error(error);
                })
            }}/>
            {suggestedAddresses.map(suggestedAddress => (
                    <div>{suggestedAddress.street}, {suggestedAddress.city}, {suggestedAddress.state}, {suggestedAddress.zipCode}</div>
                )
            )}
            <div>
                <div id='choose-location-address-address-row'
                     className='single-input-row'>
                    <label>Address*</label>
                    <input type='text'
                           placeholder='Ex. West 22nd Street'
                           value={street}
                           onChange={(event) => {
                               setStreet(event.target.value);
                           }}/>
                </div>
                <AddressSecondRow
                    city={city}
                    state={state}
                    zipCode={zipCode}
                    setCity={setCity}
                    setZipCode={setZipCode}
                    handleStateChange={handleStateChange}
                />
            </div>
            <div>
                <div className='single-input-row'>
                    <label>Nick Name*</label>
                    <input type='text'
                           value={nickname}
                           onChange={(event => setNickName(event.target.value))}
                    />
                </div>
            </div>
            <button onClick={handleClickConfirm}>Confirm</button>
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