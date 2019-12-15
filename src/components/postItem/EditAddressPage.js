import React, {useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import InputWithError from "../shared/InputWithError";
import AddressSecondRow from "./AddressSecondRow";
import {updateLocation} from "../../services/LocationService";
import {useHistory} from "react-router-dom";

const EditAddressPage = (props) => {
    const initialLocation = props.location.state;
    const [nickname, setNickName] = useState(initialLocation.nickname);
    const [street, setStreet] = useState(initialLocation.street);
    const [city, setCity] = useState(initialLocation.city);
    const [state, setState] = useState({value: initialLocation.state, label: initialLocation.state});
    const [zipCode, setZipCode] = useState(initialLocation.zipCode);

    let history = useHistory();

    const handleClickConfirm = () => {
        updateLocation({
            id: initialLocation.id,
            street, city, state: state.value, zipCode
        }).then((response) => {
            history.push('/post-item/price-and-delivery/choose-location', response.data);
        });
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/price-and-delivery/choose-location"
                              title='Edit Address'/>
            <label>Nick Name*</label>
            <InputWithError type='text' value={nickname} onChange={setNickName}/>
            <label>Address*</label>
            <InputWithError type='text' value={street} onChange={setStreet}/>
            <AddressSecondRow setCity={setCity}
                              setZipCode={setZipCode}
                              handleStateChange={setState}
                              city={city}
                              state={state}
                              zipCode={zipCode}
            />
            <button onClick={handleClickConfirm}>Confirm</button>
        </div>
    )
};

export default EditAddressPage