import PropTypes from 'prop-types';
import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";
import "../../styles/Input.scss";
import "../../styles/PostItemDetailPage.scss";
import CategorySelect from "./CategorySelect";
import ConditionSelect from "./ConditionSelect";
import DescriptionTextInput from "./DescriptionTextInput";
import ProgressBar from "./ProgressBar";

const PostItemDetailPage = (props) => {
    return (
        <div id='post-item-detail-page'>
            <PostItemTitleBar
                backLink="/post-item"
                title='Post Items'
            />
            <ProgressBar/>
            <CategorySelect
                categories={props.item.categories}
                onCategoryChange={props.onCategoryChange}
            />
            <ConditionSelect
                onConditionChange={props.onConditionChange}
                condition={props.item.condition}
            />
            <DescriptionTextInput
                description={props.item.description}
                onDescriptionChange={props.onDescriptionChange}
            />
            <NextButton destination='/price-and-delivery'/>
        </div>
    )
};

PostItemDetailPage.propTypes = {
    item: PropTypes.any,
    onCategoryChange: PropTypes.func,
    onConditionChange: PropTypes.func,
    onDescriptionChange: PropTypes.func
};

export default PostItemDetailPage