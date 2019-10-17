import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import './styles/Modal.scss';
import {withRouter} from "react-router-dom";

const LocationPickerPage = withRouter((props) => {
    const [locations, setLocations] = useState([]);

    const addLocation = (location) => {
        setLocations([...locations, location])
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position => {
            console.log(position);
            addLocation(position.coords);
        }), (error) => console.log(error));
    };

    return (
        <div>
            <div id='date-range-picker-title-bar'
                 className='fixed-title-bar'>
                <span>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
                <span className='fixed-title-bar__title--font'>Locations</span>
                <span id='location-picker-done' onClick={() => {props.history.push('/')}}>Done</span>
            </div>

            <div>
                Current latitude:
                {locations[0] ? locations[0].latitude : ''}<br/>
                Current longitude:
                {locations[0] ? locations[0].longitude : ''}
            </div>

        </div>
    )
});

export default LocationPickerPage