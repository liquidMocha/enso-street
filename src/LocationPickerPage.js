import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import './styles/Modal.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SelectableLocationRow from "./SelectableLocationRow";

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
            <div id='date-range-picker-title-bar' className='fixed-title-bar'>
                <span id='add-location-button' onClick={() => props.history.push('/add-location')}>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
                <span className='fixed-title-bar__title--font'>Locations</span>
                <span id='location-picker-done' onClick={() => {
                    props.history.push('/')
                }}>Done</span>
            </div>

            <div id='selectable-search-locations'>
                {props.locations.map(location => {
                    return <SelectableLocationRow key={location.zipCode} name={location.nickname}/>
                })}
            </div>

        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        locations: state.searchCriteria.locations
    }
};

export default connect(
    mapStateToProps
)(LocationPickerPage)