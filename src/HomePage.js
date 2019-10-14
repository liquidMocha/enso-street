import React, {useState} from "react";
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import DateRangePickerModal from "./DateRangePickerModal";
import LocationPickerModal from "./LocationPickerModal";
import './styles/Sizing.scss';
import Modal from "react-modal";

const HomePage = () => {
    const [displayDatePicker, toggleDatePicker] = useState(false);
    const [displayLocationPicker, toggleLocationPicker] = useState(false);
    const [rentDate, setRentDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [displayLocationPermission, toggleLocationPermissionPopup] = useState(true);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

    const popupModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            'font-size': '16px',
            height: '70px',
            width: '50vw',
            'border-radius': 0
        }
    };

    return (
        <div>
            {displayDatePicker || displayLocationPicker ? null :
                <div>
                    <div className='input-size input-field'
                         id='location-opener'
                         onClick={() => {
                             toggleLocationPicker(true)
                         }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                    </div>
                    <div className='input-size input-field'
                         id='date-range-opener'
                         onClick={() => {
                             toggleDatePicker(true)
                         }}>
                        <FontAwesomeIcon icon={faCalendarAlt}/>
                        {`${dateFormatter.format(rentDate)} - ${dateFormatter.format(returnDate)}`}
                    </div>
                    <button id='home-page-search-button'>Search</button>
                </div>
            }
            <Modal id='location-permission-modal'
                   isOpen={displayLocationPermission}
                   overlayClassName="popup-modal-overlay"
                   style={popupModalStyles}>
                "Enso Street" would like to user your current location?
                <div className='horizontal-layout button-group'>
                    <div id='do-not-allow-location-button' onClick={() => {
                        toggleLocationPermissionPopup(false);
                        toggleLocationPicker(true);
                    }}>Don't allow
                    </div>
                    <div id='allow-location-button' onClick={() => {
                        toggleLocationPermissionPopup(false);
                    }}>Ok
                    </div>
                </div>
            </Modal>
            <DateRangePickerModal displayDatePicker={displayDatePicker}
                                  toggleDatePicker={toggleDatePicker}
                                  setRentDate={setRentDate}
                                  setReturnDate={setReturnDate}
                                  rentDate={rentDate}
                                  returnDate={returnDate}/>

            <LocationPickerModal shouldDisplay={displayLocationPicker}
                                 onDone={() => {
                                     toggleLocationPicker(false)
                                 }}/>
        </div>
    )
};

export default HomePage;