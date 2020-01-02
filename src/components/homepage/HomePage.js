import React, {useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Sizing.scss';
import TitleBar from "../shared/TitleBar";
import {reverseGeocode} from "../../services/LocationService";
import {useHistory} from "react-router-dom";
import LocationAutosuggest from "../shared/LocationAutosuggest";

const HomePage = () => {

    const [searchExpanded, expandSearch] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [displayLocation, setDisplayLocation] = useState(null);
    const [coordinatesNotAvailable, setCoordinatesNotAvailable] = useState(false);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const history = useHistory();

    const search = () => {
        history.push('/search-result', {coordinates, address: `${street}, ${city}, ${state}, ${zipCode}`});
    };

    const onAddressChange = (event, {suggestion}) => {
        setStreet(`${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`);
        setCity(suggestion.city);
        setState(suggestion.state);
        setZipCode(suggestion.zipCode);
    };

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <div className='input-size input-field'
                             onClick={() => {
                             }}>
                            <FontAwesomeIcon icon={faSearch}/>
                            Item name
                        </div>
                        {coordinatesNotAvailable ?
                            <LocationAutosuggest onAddressChange={onAddressChange}/> :
                            <div className='input-size input-field'
                                 onClick={() => {
                                     navigator.geolocation.getCurrentPosition((position => {
                                         const latitude = position.coords.latitude;
                                         const longitude = position.coords.longitude;
                                         setCoordinates({
                                             latitude: latitude,
                                             longitude: longitude
                                         });

                                         reverseGeocode({latitude, longitude})
                                             .then(locationLabel => {
                                                 setDisplayLocation(locationLabel);
                                             });
                                     }), () => {
                                         setCoordinatesNotAvailable(true)
                                     })
                                 }}>
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                {displayLocation ? displayLocation :
                                    (coordinates ?
                                        `${coordinates.latitude}, ${coordinates.longitude}`
                                        : 'Add location')}
                            </div>}
                        <button id='home-page-search-button' onClick={search}>Search</button>
                    </>
                    :
                    <div className='input-size input-field'
                         id='location-opener'
                         onClick={() => {
                             expandSearch(true);
                         }}>
                        <FontAwesomeIcon icon={faSearch}/>
                        Search Enso Street
                    </div>
                }
            </div>
        </div>
    )
};

export default HomePage;