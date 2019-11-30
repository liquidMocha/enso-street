import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import NextButton from "./NextButton";
import {updatePostedItemImageUrl, updatePostedItemTitle} from "../../redux/postItemActions";
import InputWithError from "../shared/InputWithError";
import {Link} from "react-router-dom";
import "../../styles/Input.scss";
import "../../styles/Button.scss";
import "../../styles/App.scss";
import "../../styles/Image.scss";

export const PostItemPage = (props) => {
    return (
        <div>
            <PostItemTitleBar hideBackButton={true}/>
            <div>
                <label>Title</label>
                <InputWithError id='item-title-input' type='text'
                                onChange={(value) => props.updatePostedItemTitle(value)}
                                value={props.title}
                                shouldError={() => {
                                    return props.title === "";
                                }}
                />
                {props.imageUrl ? <img src={props.imageUrl} alt='User provided item'/> : null}
                <Link to='/post-item/use-my-photo' className='center-aligned'>
                    <FontAwesomeIcon icon={faImage}/>
                    Use my photo
                </Link>
                <NextButton destination='/post-item/details'/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        imageUrl: state.postedItem.imageUrl,
        title: state.postedItem.title
    }
};

const mapDispatchToProps = {updatePostedItemTitle, updatePostedItemImageUrl};

export default connect(mapStateToProps, mapDispatchToProps)(PostItemPage)