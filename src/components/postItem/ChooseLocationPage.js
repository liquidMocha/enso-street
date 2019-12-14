import React, {useEffect, useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import Select from "react-select";
import '../../styles/Input.scss';
import '../../styles/ChooseLocationPage.scss';
import {useDispatch} from "react-redux";
import {updatePostedItemLocation} from "../../redux/postItemActions";
import {useHistory} from "react-router-dom";
import {createLocation, getLocations} from "../../services/LocationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const ChooseLocationPage = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState(null);
    const [nickname, setNickName] = useState('');
    const [locations, setLocations] = useState([]);

    const dispatch = useDispatch();

    let history = useHistory();

    useEffect(() => {
        getLocations()
            .then(locations => {
                setLocations(locations);
            });
    }, []);
    const handleStateChange = (option) => {
        setState(option);
    };

    const handleClickConfirm = () => {
        createLocation({
            street: street,
            city: city,
            state: state.value,
            zipCode: zipCode,
            nickname: nickname
        }).then((locationId) => {
            dispatch(updatePostedItemLocation({
                id: locationId,
                street: street,
                city: city,
                state: state.value,
                zipCode: zipCode,
                nickname: nickname
            }));
            history.push('/post-item/price-and-delivery');
        });
    };

    const handleClickSavedAddress = (locationId) => {
        const selectedLocation = locations.filter(location => {
            return location.id === locationId;
        })[0];

        dispatch(updatePostedItemLocation(selectedLocation));
        history.push('/post-item/price-and-delivery');
    };

    const stateOptions = [
        {value: "Alabama", label: "Alabama"},
        {value: "Alaska", label: "Alaska"},
        {value: "Arizona", label: "Arizona"},
        {value: "Arkansas", label: "Arkansas"},
        {value: "California", label: "California"},
        {value: "Colorado", label: "Colorado"},
        {value: "Connecticut", label: "Connecticut"},
        {value: "Delaware", label: "Delaware"},
        {value: "Florida", label: "Florida"},
        {value: "Georgia", label: "Georgia"},
        {value: "Hawaii", label: "Hawaii"},
        {value: "Idaho", label: "Idaho"},
        {value: "Illinois", label: "Illinois"},
        {value: "Indiana", label: "Indiana"},
        {value: "Iowa", label: "Iowa"},
        {value: "Kansas", label: "Kansas"},
        {value: "Kentucky", label: "Kentucky"},
        {value: "Louisiana", label: "Louisiana"},
        {value: "Maine", label: "Maine"},
        {value: "Maryland", label: "Maryland"},
        {value: "Massachusetts", label: "Massachusetts"},
        {value: "Michigan", label: "Michigan"},
        {value: "Minnesota", label: "Minnesota"},
        {value: "Mississippi", label: "Mississippi"},
        {value: "Missouri", label: "Missouri"},
        {value: "Montana", label: "Montana"},
        {value: "Nebraska", label: "Nebraska"},
        {value: "Nevada", label: "Nevada"},
        {value: "New Hampshire", label: "New"},
        {value: "New Jersey", label: "New"},
        {value: "New Mexico", label: "New"},
        {value: "New York", label: "New"},
        {value: "North Carolina", label: "North"},
        {value: "North Dakota", label: "North"},
        {value: "Ohio", label: "Ohio"},
        {value: "Oklahoma", label: "Oklahoma"},
        {value: "Oregon", label: "Oregon"},
        {value: "Pennsylvania", label: "Pennsylvania"},
        {value: "Rhode Island", label: "Rhode"},
        {value: "South Carolina", label: "South"},
        {value: "South Dakota", label: "South"},
        {value: "Tennessee", label: "Tennessee"},
        {value: "Texas", label: "Texas"},
        {value: "Utah", label: "Utah"},
        {value: "Vermont", label: "Vermont"},
        {value: "Virginia", label: "Virginia"},
        {value: "Washington", label: "Washington"},
        {value: "West Virginia", label: "West"},
        {value: "Wisconsin", label: "Wisconsin"},
        {value: "Wyoming", label: "Wyoming"}
    ];

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/price-and-delivery" title='Location'/>
            <div>
                <div id='choose-location-address-address-row'
                     className='single-input-row'>
                    <label>Address*</label>
                    <input type='text'
                           placeholder='Ex. West 22nd Street'
                           onChange={(event) => {
                               setStreet(event.target.value);
                           }}/>
                </div>
                <div id='choose-location-address-second-row'>
                    <div id='choose-location-address-second-row-city'>
                        <label>City*</label>
                        <input type='text'
                               placeholder='Enter City'
                               onChange={(event) => {
                                   setCity(event.target.value);
                               }}/>
                    </div>
                    <div id='choose-location-address-second-row-state'>
                        <label>State*</label>
                        <Select
                            placeholder='Ohio'
                            onChange={handleStateChange}
                            options={stateOptions}
                            value={state}
                        />
                    </div>
                    <div id='choose-location-address-second-row-zip-code'>
                        <label>Zip Code*</label>
                        <input type='number'
                               placeholder='00000'
                               onChange={(event) => {
                                   setZipCode(event.target.value);
                               }}/>
                    </div>
                </div>
            </div>
            <div>
                <div className='single-input-row'>
                    <label>Nick Name*</label>
                    <input type='text'
                           onChange={(event => setNickName(event.target.value))}
                    />
                </div>
            </div>
            <button onClick={handleClickConfirm}>Confirm</button>
            <div id='choose-location-saved-address'>
                <p>Or choose from your saved addresses</p>
                {locations.map(location => (
                    <div key={location.id} className='choose-location-saved-address-row'>
                        <div className='choose-location-select-area' onClick={
                            () => {
                                handleClickSavedAddress(location.id)
                            }}>
                            <span id='choose-location-saved-address-nickname'>{location.nickname}</span>
                            <span>{location.street}, {location.zipCode}</span>
                        </div>
                        <FontAwesomeIcon className='choose-location-saved-address-row-edit-button' icon={faEdit}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ChooseLocationPage