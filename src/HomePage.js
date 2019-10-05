import React, {useState} from "react";
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import DateRangePickerModal from "./DateRangePickerModal";

const HomePage = () => {
    const [displayDatePicker, toggleDatePicker] = useState(false);
    const [rentDate, setRentDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

    const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

    return (
        <div id='home-page'>
            {displayDatePicker ? null :
                <div>
                    <div className='input'
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
        </div>
    )
};

export default HomePage;