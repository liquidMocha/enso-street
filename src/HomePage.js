import React from "react";
import './styles/Button.scss';
import './styles/Input.scss';
import './styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './styles/Sizing.scss';
import {withRouter} from "react-router-dom";
import TitleBar from "./TitleBar";
import {connect} from "react-redux";

const HomePage = withRouter((props) => {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

    return (
        <div>
            <TitleBar/>
            <div>
                <div className='input-size input-field'
                     id='location-opener'
                     onClick={() => {
                         props.history.push('/location')
                     }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                </div>
                <div className='input-size input-field'
                     id='date-range-opener'
                     onClick={() => {
                         props.history.push('/pick-date');
                     }}>
                    <FontAwesomeIcon icon={faCalendarAlt}/>
                    {`${dateFormatter.format(props.rentDate)} - ${dateFormatter.format(props.returnDate)}`}
                </div>
                <button id='home-page-search-button'>Search</button>
            </div>
        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        rentDate: state.searchCriteria.dates.rentDate,
        returnDate: state.searchCriteria.dates.returnDate
    };
};

export default connect(mapStateToProps)(HomePage);