import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages, faCamera} from "@fortawesome/free-solid-svg-icons";
import {updatePostedItemImageUrl} from "../../redux/postItemActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../styles/Input.scss";

const UseMyPhoto = withRouter((props) => {
    return (
        <div className='column-layout'>
            <div className='image-button'>
                <input id='take-photo-input' type="file" accept="image/*" capture="camera"
                       onChange={(event) => {
                           if (event.target.files && event.target.files[0]) {
                               props.updatePostedItemImageUrl(URL.createObjectURL(event.target.files[0]));
                               props.history.push('/post-item');
                           }
                       }}/>
                <label htmlFor='take-photo-input'>
                    <FontAwesomeIcon icon={faCamera}/>
                    Take Photo
                </label>
            </div>
            <div className='image-button'>
                <input id='select-image-input' type="file" accept="image/*"
                       onChange={(event) => {
                           if (event.target.files && event.target.files[0]) {
                               props.updatePostedItemImageUrl(URL.createObjectURL(event.target.files[0]));
                               props.history.push('/post-item');
                           }
                       }}/>
                <label htmlFor='select-image-input'>
                    <FontAwesomeIcon icon={faImages}/>
                    Select Photo
                </label>
            </div>
        </div>
    )
});

const mapDispatchToProps = {updatePostedItemImageUrl};

export default connect(null, mapDispatchToProps)(UseMyPhoto)