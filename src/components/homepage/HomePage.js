import React, {useEffect, useRef, useState} from "react";
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
import {useDispatch} from "react-redux";
import {UPDATE_LOCATION_ACTION} from "../../redux/current_location/CurrentLocaitonActions";
import CategoryCard from "./CategoryCard";

const HomePage = (props) => {
    const dispatch = useDispatch();
    const [searchExpanded, expandSearch] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [displayLocation, setDisplayLocation] = useState(null);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [useAddress, setUserAddress] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const searchTermInputElement = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordinates({
                latitude: latitude,
                longitude: longitude
            });

            dispatch(UPDATE_LOCATION_ACTION({latitude, longitude}));

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
        if (searchTerm) {
            if (useAddress) {
                props.onSearch(searchTerm, {address: `${street}, ${city}, ${state}, ${zipCode}`});
            } else {
                props.onSearch(searchTerm, coordinates);
            }
        } else {
            searchTermInputElement.current.focus();
        }
    };

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <FontAwesomeIcon icon={faSearch}/>
                        <input type='text'
                               placeholder='Item name'
                               onChange={(event) => {
                                   setSearchTerm(event.target.value)
                               }}
                               ref={searchTermInputElement}
                        />
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            <LocationAutosuggest onAddressChange={onAddressChange} address={displayLocation}/>
                        </div>
                        <button id='home-page-search-button' onClick={onClickingSearch}>Search</button>
                    </>
                    :
                    <SearchExpander expandSearch={() => {
                        expandSearch(true)
                    }}/>
                }
            </div>
            <section className='category-cards'>
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/home+maintenance.JPG'
                    name='Home Maintenance'
                    categoryKey='home-maintenance'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/garden+and+patio+3.JPG'
                    name='Garden & Patio'
                    categoryKey='garden-and-patio'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/party+and+events.jpg'
                    name='Party & Events'
                    categoryKey='party-and-events'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/novelty+electronics.JPG'
                    name='Try Before You Buy'
                    categoryKey='novelty-electronics'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/baby+and+kids+2.jpg'
                    name='Baby & Kids'
                    categoryKey='baby-and-kids'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/DIY+home+improvement+2.jpg'
                    name='DIY Home Improvement'
                    categoryKey='diy-home-improvement'
                />
            </section>
        </div>
    )
};

HomePage.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default HomePage;