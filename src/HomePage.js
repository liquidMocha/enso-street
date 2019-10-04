import React, {useState} from "react";
import Modal from 'react-modal';
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [displayDatePicker, toggleDatePicker] = useState(false);

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
                    <span />
                    <span id='date-range-picker-title'>Select Dates</span>
                    <span id='date-range-picker-close' onClick={() => {
                        toggleDatePicker(false);
                    }}>Done
                    </span>
                </div>
            </Modal>
        </div>
    )
};

export default HomePage;