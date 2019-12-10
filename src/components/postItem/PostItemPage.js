import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {useDispatch, useSelector} from "react-redux";
import NextButton from "./NextButton";
import {updatePostedItemTitle} from "../../redux/postItemActions";
import InputWithError from "../shared/InputWithError";
import PostImageInput from "./PostImageInput";
import "../../styles/Input.scss";
import "../../styles/Button.scss";
import "../../styles/App.scss";
import "../../styles/Image.scss";
import ProgressBar from "./ProgressBar";

export const PostItemPage = () => {
    const dispatch = useDispatch();
    const title = useSelector(state => state.postedItem.title);

    return (
        <div>
            <PostItemTitleBar hideBackButton={true}/>
            <ProgressBar/>
            <div>
                <label>Title</label>
                <InputWithError id='item-title-input' type='text'
                                onChange={(value) => dispatch(updatePostedItemTitle(value))}
                                value={title}
                                shouldError={() => {
                                    return title === "";
                                }}
                />
                <PostImageInput/>
                <NextButton destination='/post-item/details'/>
            </div>
        </div>
    )
};

export default PostItemPage;