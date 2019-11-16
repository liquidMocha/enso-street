import React from "react";
import '../../styles/Input.scss';
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import '../../styles/Button.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import NextButton from "./NextButton";
import {updatePostedItemImageUrl, updatePostedItemTitle} from "../../redux/postItemActions";

export const PostItemPage = (props) => {
    return (
        <div>
            <PostItemTitleBar hideBackButton={true}/>
            <div>
                <label>Title</label>
                <input className='input-field' type='text' id='item-title-input'
                       onChange={((event) => {
                           props.updatePostedItemTitle(event.target.value);
                       })}
                       value={props.title}
                />
                <div className='image-button'>
                    <input id='take-photo-input' type="file" accept="image/*" capture="camera"
                           onChange={(event) => {
                               if (event.target.files && event.target.files[0]) {
                                   props.updatePostedItemImageUrl(URL.createObjectURL(event.target.files[0]));
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

const mapStateToProps = (state) => {
    return {
        title: state.postedItem.title
    }
};

const mapDispatchToProps = {updatePostedItemTitle, updatePostedItemImageUrl};

export default connect(mapStateToProps, mapDispatchToProps)(PostItemPage)