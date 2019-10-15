import React, {useState} from "react";
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import DateRangePickerModal from "./DateRangePickerModal";
import LocationPickerModal from "./LocationPickerModal";
import './styles/Sizing.scss';

const HomePage = () => {
    const [displayDatePicker, toggleDatePicker] = useState(false);
    const [displayLocationPicker, toggleLocationPicker] = useState(false);
    const [rentDate, setRentDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

    const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

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