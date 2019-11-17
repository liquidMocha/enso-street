import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";
import {
    updatePostedItemCategories,
    updatePostedItemCondition,
    updatePostedItemDescription
} from "../../redux/postItemActions";
import {connect} from "react-redux";
import "../../styles/Input.scss";
import "../../styles/PostItemDetailPage.scss";
import Select from 'react-select';

const PostItemDetailPage = (props) => {

    const handleConditionChange = (selected) => {
        props.updatePostedItemCondition(selected);
    };

    const handleDescriptionChange = (event) => {
        props.updatePostedItemDescription(event.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        props.updatePostedItemCategories(selectedOption);
    };

    const categoryOptions = [
        {value: "baby-and-kids", label: "Baby & Kids"},
        {value: "business-equipment", label: "Business Equipment"},
        {value: "diy-home-improvement", label: "DIY Home Improvement"},
        {value: "farming", label: "Farming"},
        {value: "free", label: "Free"},
        {value: "garden-and-patio", label: "Garden & Patio"},
        {value: "home-maintenance", label: "Home Maintenance"},
        {value: "music-instruments", label: "Music Instruments"},
        {value: "novelty-electronics", label: "Novelty Electronics"}
    ];

    const conditionOptions = [
        {value: "like-new", label: "Like new"},
        {value: "normal-wear", label: "Normal wear"},
        {value: "functional", label: "Functional"}
    ];

    const descriptionPlaceholder = "Ex. Size 53'' * 30'' * 45'' LWH";
    return (
        <div id='post-item-detail-page'>
            <PostItemTitleBar backLink="/post-item"/>
            <div>
                <label>Categories</label>
                <Select
                    placeholder='Select category'
                    closeMenuOnSelect={false}
                    isMulti={true}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    value={props.categories}
                />
            </div>
            <div>
                <label>Condition</label>
                <Select
                    onChange={handleConditionChange}
                    options={conditionOptions}
                    value={props.condition}
                />
            </div>
            <div>
                <label>Description (optional)</label>
                <textarea onChange={handleDescriptionChange}
                          placeholder={descriptionPlaceholder} maxLength={2500}/>
            </div>
            <NextButton destination='/post-item/price-and-delivery'/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        categories: state.postedItem.categories,
        condition: state.postedItem.condition,
        description: state.postedItem.description
    }
};

const mapDispatchToProps = {
    updatePostedItemCondition,
    updatePostedItemDescription,
    updatePostedItemCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItemDetailPage)