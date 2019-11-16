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
import Select from 'react-select';

const PostItemDetailPage = (props) => {

    const handleConditionChange = (event) => {
        props.updatePostedItemCondition(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        props.updatePostedItemDescription(event.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        props.updatePostedItemCategories(selectedOption);
    };

    const options = [
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

    const descriptionPlaceholder = "Ex. Size 53'' * 30'' * 45'' LWH";
    return (
        <div>
            <PostItemTitleBar backLink="/post-item"/>
            <div>
                <label>Categories</label>
                <Select
                    closeMenuOnSelect={false}
                    isMulti={true}
                    onChange={handleCategoryChange}
                    options={options}
                />
            </div>
            <div>
                <label>Condition</label>
                <select onChange={handleConditionChange} defaultValue={props.condition}>
                    <option value="like-new">Like new</option>
                    <option value="normal-wear">Normal wear</option>
                    <option value="functional">Functional</option>
                </select>
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