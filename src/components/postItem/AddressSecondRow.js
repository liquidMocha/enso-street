import React from "react";
import Select from "react-select";

const AddressSecondRow = (props) => {
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
        <div id='choose-location-address-second-row'>
            <div id='choose-location-address-second-row-city'>
                <label>City*</label>
                <input type='text'
                       placeholder='Enter City'
                       onChange={(event) => {
                           props.setCity(event.target.value);
                       }}
                       value={props.city}
                />
            </div>
            <div id='choose-location-address-second-row-state'>
                <label>State*</label>
                <Select
                    placeholder='Ohio'
                    onChange={props.handleStateChange}
                    options={stateOptions}
                    value={props.state}
                />
            </div>
            <div id='choose-location-address-second-row-zip-code'>
                <label>Zip Code*</label>
                <input type='number'
                       placeholder='00000'
                       onChange={(event) => {
                           props.setZipCode(event.target.value);
                       }}
                       value={props.zipCode}
                />
            </div>
        </div>
    )
};

export default AddressSecondRow