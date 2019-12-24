import React, {useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Sizing.scss';
import TitleBar from "../shared/TitleBar";
import {reverseGeocode} from "../../services/LocationService";

const HomePage = () => {

    const [searchExpanded, expandSearch] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [displayLocation, setDisplayLocation] = useState(null);

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <div className='input-sizeinput-field'
                                      onClick={() => {
                                      }}>
                            <FontAwesomeIcon icon={faSearch}/>
                            Item name
                        </div>
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
                                          }), (error) => console.log(error))
                             }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {displayLocation ? displayLocation :
                                (coordinates ?
                                    `${coordinates.latitude}, ${coordinates.longitude}`
                                    : 'Add location')}
                        </div>
                        <button id='home-page-search-button'>Search</button>
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