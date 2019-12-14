import React, {useEffect, useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import Toggle from "./Toggle";
import Select from "react-select";
import '../../styles/Input.scss';
import {useDispatch} from "react-redux";
import {updatePostedItemLocation} from "../../redux/postItemActions";
import {useHistory} from "react-router-dom";
import {getLocations} from "../../services/LocationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const ChooseLocationPage = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState(null);
    const [nickname, setNickName] = useState('');
    const [saveThisAddress, setSaveThisAddress] = useState(false);
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
        if (saveThisAddress) {

        } else {
            dispatch(updatePostedItemLocation({
                street: street,
                city: city,
                state: state.value,
                zipCode: zipCode
            }));
            history.push('/post-item/price-and-delivery');
        }
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
                <div>
                    <label>Address*</label>
                    <input className='input-field' type='text'
                           placeholder='Ex. West 22nd Street'
                           onChange={(event) => {
                               setStreet(event.target.value);
                           }}/>
                </div>
                <div>
                    <label>City*</label>
                    <input className='input-field' type='text'
                           placeholder='Enter City'
                           onChange={(event) => {
                               setCity(event.target.value);
                           }}/>
                    <label>State*</label>
                    <Select
                        placeholder='Ohio'
                        onChange={handleStateChange}
                        options={stateOptions}
                        value={state}
                    />
                    <label>Zip Code*</label>
                    <input className='input-field'
                           type='number'
                           placeholder='00000'
                           onChange={(event) => {
                               setZipCode(event.target.value);
                           }}/>
                </div>
            </div>
            <div>
                Save this address
                <Toggle value={saveThisAddress} onChange={() => {
                    setSaveThisAddress(!saveThisAddress);
                }}/>
                {saveThisAddress ?
                    <div>
                        <label>Nick Name*</label>
                        <input className='input-field' type='text'/>
                    </div>
                    : null
                }
            </div>
            <button onClick={handleClickConfirm}>Confirm</button>
            <div>
                <p>Or choose from your saved addresses</p>
                {locations.map(location => (
                    <div key={location.id}>
                        <span>{location.nickname}</span>
                        <span>{location.street}, {location.zipCode}</span>
                        <FontAwesomeIcon icon={faEdit}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ChooseLocationPage