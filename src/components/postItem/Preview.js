import PropTypes from 'prop-types';
import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import "../../styles/Image.scss";
import "../../styles/Preview.scss";
import {useHistory} from "react-router-dom";

const Preview = (props) => {
    const item = props.item;
    let history = useHistory();

    const renderCategories = () => {
        return item.categories.map(category => {
            return <div key={category.value}>{category.label}</div>
        })
    };

    const onClickingEdit = () => {
        history.push('/edit-complete-item');
    };

    return (
        <div className='column-layout left-aligned' id='preview-root'>
            <PostItemTitleBar backLink="/price-and-delivery"
                              title='Post Items'
                              backLinkState={{item}}
            />
            <img src={item.imageUrl} alt="Posted Item"/>
            <div className='bold'>{item.title}</div>
            <div className='horizontal-layout' id='preview-prices'>
                <span>${item.rentalDailyPrice} per day</span>
                <span>${item.deposit} deposit</span>
            </div>
            <div>
                <span className='bold key-value-column'>Categories</span>
                {renderCategories()}
            </div>
            <div>
                <span className='bold key-value-column'>Condition</span>
                {item.condition.label}
            </div>
            <div>
                <span className='bold'>Description</span>
                {item.description}
            </div>
            {item.canBeDelivered ?
                <div id='preview-delivery-prices-section'>
                    <span className='bold'>This item can be delivered</span>
                    <div id='preview-delivery-prices'>
                        <span>${item.deliveryStarting} within 3 mile</span>
                        <span>${item.deliveryAdditional} per additional mile</span>
                    </div>
                </div>
                : null}
            <div className='horizontal-layout' id='preview-buttons'>
                <button className='preview-button' onClick={onClickingEdit}>Edit</button>
                <button className='preview-button' onClick={props.onPostingItem}>Post</button>
            </div>
        </div>
    )
};

Preview.propTypes = {
    item: PropTypes.any,
    onPostingItem: PropTypes.func
};

export default Preview;