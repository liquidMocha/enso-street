import React, {useState} from "react";
import '../../styles/Input.scss';
import {withRouter} from "react-router-dom";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {updatePostedItemTitle} from "../../redux/actions";
import {connect} from "react-redux";
import '../../styles/Button.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import NextButton from "./NextButton";

export const PostItemPage = (props) => {
    const [itemTitle, setItemTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    return (
        <div>
            <PostItemTitleBar/>
            <div className='center-aligned'>
                <label>Title</label>
                <input className='input-field' type='text' id='item-title-input'
                       onChange={((event) => {
                           setItemTitle(event.target.value);
                       })}
                       onBlur={() => {
                           props.updatePostedItemTitle(itemTitle);
                       }}/>
                <div className='image-button'>
                    <input id='take-photo-input' type="file" accept="image/*" capture="camera"
                           onChange={(event) => {
                               if (event.target.files && event.target.files[0]) {
                                   setImageUrl(URL.createObjectURL(event.target.files[0]));
                               }
                           }}/>
                    <label htmlFor='take-photo-input'>
                        <FontAwesomeIcon icon={faCamera}/>
                        Take a photo
                    </label>
                </div>
                <NextButton destination='/post-item/details'/>
            </div>
        </div>
    )
};

const mapDispatchToProps = {updatePostedItemTitle};

export default withRouter(connect(null, mapDispatchToProps)(PostItemPage))