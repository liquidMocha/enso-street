import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";
import "../../styles/Input.scss";
import "../../styles/PostItemDetailPage.scss";
import CategorySelect from "./CategorySelect";
import ConditionSelect from "./ConditionSelect";
import DescriptionTextInput from "./DescriptionTextInput";
import ProgressBar from "./ProgressBar";

const PostItemDetailPage = () => {

    return (
        <div id='post-item-detail-page'>
            <PostItemTitleBar backLink="/post-item" title='Post Items'/>
            <ProgressBar/>
            <CategorySelect/>
            <ConditionSelect/>
            <DescriptionTextInput/>
            <NextButton destination='/post-item/price-and-delivery'/>
        </div>
    )
};

export default PostItemDetailPage