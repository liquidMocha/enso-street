import React from "react";
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    return (
        <div id='home-page'>
            <div className='input' id='date-range-opener'>
                <FontAwesomeIcon icon={faCalendarAlt}/>
                <i className='far fa-calendar-alt'/>
            </div>

            <button>Search</button>
        </div>
    )
};

export default HomePage;