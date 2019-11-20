import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import "../../styles/Image.scss";
import "../../styles/Preview.scss";
import {withRouter} from "react-router-dom";

const Preview = withRouter((props) => {

    const renderCategories = () => {
        return props.categories.map(category => {
            return <div key={category.value}>{category.label}</div>
        })
    };

    const onClickingEdit = () => {
        props.history.push('/post-item/price-and-delivery');
    };

    return (
        <div className='column-layout left-aligned'>
            <PostItemTitleBar backLink="/post-item/price-and-delivery"/>
            <img src={props.imageUrl} alt="Posted Item"/>
            <div className='bold'>{props.itemTitle}</div>
            <div className='horizontal-layout' id='preview-prices'>
                <span>${props.dailyPrice} per day</span>
                <span>${props.deposit} deposit</span>
            </div>
            <div>
                <span className='bold key-value-column'>Categories</span>
                {renderCategories()}
            </div>
            <div>
                <span className='bold key-value-column'>Condition</span>
                {props.condition.label}
            </div>
            <div>
                <span className='bold'>Description</span>
                {props.description}
            </div>
            <div className='horizontal-layout' id='preview-buttons'>
                <button className='preview-button' onClick={onClickingEdit}>Edit</button>
                <button className='preview-button'>Post</button>
            </div>
        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        imageUrl: state.postedItem.imageUrl,
        itemTitle: state.postedItem.title,
        dailyPrice: state.postedItem.rentalDailyPrice,
        deposit: state.postedItem.deposit,
        categories: state.postedItem.categories,
        condition: state.postedItem.condition,
        description: state.postedItem.description,
        itemSize: state.postedItem.itemSize,
        canBeDelivered: state.postedItem.canBeDelivered,
    }
};

export default connect(mapStateToProps, null)(Preview)