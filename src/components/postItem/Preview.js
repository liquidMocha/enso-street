import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect, useDispatch} from "react-redux";
import "../../styles/Image.scss";
import "../../styles/Preview.scss";
import {withRouter} from "react-router-dom";
import {postItem} from "../../services/ItemService";
import {resetPostedItem} from "../../redux/postItemActions";

const Preview = withRouter((props) => {

    const dispatch = useDispatch();

    const renderCategories = () => {
        return props.categories.map(category => {
            return <div key={category.value}>{category.label}</div>
        })
    };

    const onClickingEdit = () => {
        props.history.push('/post-item/edit-complete-item');
    };

    const onClickingPost = () => {
        postItem(props.item).then(() => {
            dispatch(resetPostedItem());
            props.history.push('/my-items');
        }).catch((error) => {
            console.log('failed posting item');
            console.error(error);
        });
    };

    return (
        <div className='column-layout left-aligned' id='preview-root'>
            <PostItemTitleBar backLink="/post-item/price-and-delivery" title='Post Items'/>
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
            {props.canBeDelivered ?
                <div id='preview-delivery-prices-section'>
                    <span className='bold'>This item can be delivered</span>
                    <div id='preview-delivery-prices'>
                        <span>${props.deliveryStarting} within 3 mile</span>
                        <span>${props.deliveryAdditional} per additional mile</span>
                    </div>
                </div>
                : null}
            <div className='horizontal-layout' id='preview-buttons'>
                <button className='preview-button' onClick={onClickingEdit}>Edit</button>
                <button className='preview-button' onClick={onClickingPost}>Post</button>
            </div>
        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        item: state.postedItem,
        imageUrl: state.postedItem.imageUrl,
        itemTitle: state.postedItem.title,
        dailyPrice: state.postedItem.rentalDailyPrice,
        deposit: state.postedItem.deposit,
        categories: state.postedItem.categories,
        condition: state.postedItem.condition,
        description: state.postedItem.description,
        itemSize: state.postedItem.itemSize,
        canBeDelivered: state.postedItem.canBeDelivered,
        deliveryStarting: state.postedItem.deliveryStarting,
        deliveryAdditional: state.postedItem.deliveryAdditional
    }
};

export default connect(mapStateToProps, null)(Preview)