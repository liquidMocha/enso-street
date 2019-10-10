import React, {useState} from "react";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import './styles/Modal.scss';
import './styles/LocationPickerModal.scss';

const LocationPickerModal = (props) => {
    const [locations, setLocations] = useState([]);

    const addLocation = (location) => {
        setLocations([...locations, location])
    };

    navigator.geolocation.getCurrentPosition((position => {
        console.log(position);
        addLocation(position.coords);
    }), (error) => console.log(error));

    return (
        <Modal isOpen={props.shouldDisplay}
               overlayClassName="modal-overlay"
               className='home-page-modal'>
            <div id='date-range-picker-title-bar'
                 className='fixed-title-bar'>
                <span>
                    <FontAwesomeIcon id='date-range-plus' icon={faPlus}/>
                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                </span>
                <span>Locations</span>
                <span id='location-picker-done' onClick={props.onDone}>Done</span>
            </div>

            <div>
                Current latitude:
                {locations[0] ? locations[0].latitude : ''}<br/>
                Current longitude:
                {locations[0] ? locations[0].longitude : ''}
            </div>

        </Modal>
    )
};

export default LocationPickerModal