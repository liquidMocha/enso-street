import React, {useEffect, useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Sizing.scss';
import TitleBar from "../shared/TitleBar";
import {reverseGeocode} from "../../services/LocationService";
import LocationAutosuggest from "../shared/LocationAutosuggest";
import PropTypes from 'prop-types';
import SearchExpander from "./SearchExpander";

const HomePage = (props) => {
    const [searchExpanded, expandSearch] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [displayLocation, setDisplayLocation] = useState(null);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [useAddress, setUserAddress] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordinates({
                latitude: latitude,
                longitude: longitude
            });

            const locationLabel = await reverseGeocode({latitude, longitude});
            setDisplayLocation(locationLabel);
        }), () => {
        })
    }, []);

    const onAddressChange = (event, {suggestion}) => {
        setUserAddress(true);
        setStreet(`${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`);
        setCity(suggestion.city);
        setState(suggestion.state);
        setZipCode(suggestion.zipCode);
    };

    const onClickingSearch = () => {
        if (useAddress) {
            props.onSearch(searchTerm, {address: `${street}, ${city}, ${state}, ${zipCode}`});
        } else {
            props.onSearch(searchTerm, coordinates);
        }
    };

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <FontAwesomeIcon icon={faSearch}/><input type='text'
                                                                 placeholder='Item name'
                                                                 onChange={(event) => {
                                                                     setSearchTerm(event.target.value)
                                                                 }}/>
                        <div>
                            <LocationAutosuggest onAddressChange={onAddressChange} address={displayLocation}/>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        </div>
                        <button id='home-page-search-button' onClick={onClickingSearch}>Search</button>
                    </>
                    :
                    <SearchExpander expandSearch={() => {
                        expandSearch(true)
                    }}/>
                }
            </div>
        </div>
    )
};

HomePage.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default HomePage;