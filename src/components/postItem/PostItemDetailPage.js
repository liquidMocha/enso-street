import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";
import {updatePostedItemCondition, updatePostedItemDescription} from "../../redux/postItemActions";
import {connect} from "react-redux";
import "../../styles/Input.scss";

const PostItemDetailPage = (props) => {

    const handleConditionChange = (event) => {
        props.updatePostedItemCondition(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        props.updatePostedItemDescription(event.target.value);
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item"/>
            <div>
                <label>Condition</label>
                <select onChange={handleConditionChange}>
                    <option value="like-new">Like new</option>
                    <option value="normal-wear">Normal wear</option>
                    <option value="functional">Functional</option>
                </select>
            </div>
            <div>
                <label>Description (optional)</label>
                <input type='textarea' onChange={handleDescriptionChange}/>
            </div>
            <NextButton destination='/post-item/price-and-delivery'/>
        </div>
    )
};

const mapDispatchToProps = {updatePostedItemCondition, updatePostedItemDescription};

export default connect(null, mapDispatchToProps)(PostItemDetailPage)