import React, {useState} from "react";
import Modal from 'react-modal';
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import DateTab from "./DateTab";

const HomePage = () => {
    const [displayDatePicker, toggleDatePicker] = useState(false);
    const [dateSelection, toggleDateSelection] = useState('rental');
    const [rentDate, setRentDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

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
                        <i className='far fa-calendar-alt'/>
                    </div>

                    <button id='home-page-search-button'>Search</button>
                </div>
            }

            <Modal className='date-range-picker-modal'
                   overlayClassName="date-range-picker-overlay"
                   isOpen={displayDatePicker}>
                <div id='date-range-picker-title-bar'>
                    <span/>
                    <span id='date-range-picker-title'>Select Dates</span>
                    <span id='date-range-picker-close' onClick={() => {
                        toggleDatePicker(false);
                    }}>Done
                    </span>
                </div>
                <div id='date-tabs'>
                    <DateTab title='Rent' onClick={() => toggleDateSelection('rental')} date={rentDate}
                             selected={dateSelection === 'rental'}/>
                    <DateTab title='Return' onClick={() => toggleDateSelection('return')} date={returnDate}
                             selected={dateSelection === 'return'}/>
                </div>
                {/*TODO: fix this*/}
                <label>date picker place holder</label>
                <input type='date' onBlur={(event) => {
                    console.log(event.target.value);
                    if (dateSelection === 'rental') {
                        setRentDate(new Date(event.target.value))
                    } else {
                        setReturnDate(new Date(event.target.value))
                    }
                }
                }/>
            </Modal>
        </div>
    )
};

export default HomePage;