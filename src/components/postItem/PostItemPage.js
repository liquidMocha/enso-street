import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";
import InputWithError from "../shared/InputWithError";
import PostImageInput from "./PostImageInput";
import "../../styles/Input.scss";
import "../../styles/Button.scss";
import "../../styles/App.scss";
import "../../styles/Image.scss";
import ProgressBar from "./ProgressBar";
import PropTypes from 'prop-types';

export const PostItemPage = (props) => {
    const titleIsEmpty = () => props.item.title === "";

    return (
        <div>
            <PostItemTitleBar hideBackButton={true} title='Post Items'/>
            <ProgressBar/>
            <div>
                <label>Title</label>
                <InputWithError id='item-title-input'
                                type='text'
                                onChange={props.onTitleChange}
                                value={props.item.title}
                                shouldError={titleIsEmpty}
                />
                <PostImageInput imageUrl={props.item.imageUrl}
                                useMyPhotoPath={props.useMyPhotoPath}
                />
                <NextButton destination='/details'/>
            </div>
        </div>
    )
};

PostItemPage.propTypes = {
    item: PropTypes.any,
    onTitleChange: PropTypes.func,
    useMyPhotoPath: PropTypes.string.isRequired
};

export default PostItemPage;