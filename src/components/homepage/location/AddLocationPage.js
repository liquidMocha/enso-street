import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import InputWithError from "../../shared/InputWithError";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addSearchLocation} from "../../../redux/actions";

const AddLocationPage = withRouter((props) => {
    const [nickname, setNickname] = useState('');
    const [zipCode, setZipCode] = useState('');

    const addAddress = (event) => {
        event.preventDefault();

        props.history.push('/location');
        props.addSearchLocation({
            nickname: nickname,
            zipCode: zipCode
        });
    };

    return (
        <div>
            <div id='date-range-picker-title-bar' className='fixed-title-bar'>
                <span id='add-location-button'>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
                <span className='fixed-title-bar__title--font'>Locations</span>
                <span id='location-picker-done'>Done</span>
            </div>

            <form id='add-address-form' onSubmit={addAddress}>
                <div>
                    <label className='input-label'>Nickname*</label>
                    <InputWithError id='nickname-field'
                                    type='text'
                                    placeholder={'Ex. Home, work, parent\'s home'}
                                    onChange={(value) => {
                                        setNickname(value)
                                    }}
                    />
                </div>
                <div>
                    <label className='input-label'>Address</label>
                    <InputWithError id='address-field'
                                    type='text'
                                    placeholder={'Ex. West 22nd Street'}
                                    onChange={() => {}}
                    />
                </div>
                <div>
                    <label className='input-label'>City</label>
                    <InputWithError id='city-field'
                                    type='text'
                                    placeholder={'Enter City'}
                                    onChange={() => {}}
                    />
                </div>
                <div>
                    <label className='input-label'>Zip Code*</label>
                    <InputWithError id='zip-code-field'
                                    type='text'
                                    onChange={(value) => {
                                        setZipCode(value)
                                    }}
                    />
                </div>
                <button id='add-address-apply' onClick={addAddress}>Apply</button>
            </form>
        </div>
    )
});

export default connect(null, {
    addSearchLocation
})(AddLocationPage)