import React from "react";
import '../../styles/Input.scss';
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import '../../styles/Button.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import NextButton from "./NextButton";
import {updatePostedItemImageUrl, updatePostedItemTitle} from "../../redux/postItemActions";
import InputWithError from "../shared/InputWithError";
import {Link} from "react-router-dom";

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
                <Link to='/post-item/use-my-photo'>
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