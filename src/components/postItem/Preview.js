import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import "../../styles/Image.scss";

const Preview = (props) => {
    return (
        <div>
            <PostItemTitleBar backLink="/post-item/price-and-delivery"/>
            <img src={props.imageUrl} alt="Posted Item"/>
            <div className='bold'>{props.itemTitle}</div>
            <div className='horizontal-layout'>
                <span>{props.dailyPrice} per day</span>
                <span>{props.deposit} deposit</span>
            </div>
            <div>
                <span className='bold'>Condition</span>
                {props.condition}
            </div>
            <div>
                <span className='bold'>Description</span>
                {props.description}
            </div>
            <div>
                <span className='bold'>Item size</span>
                {props.itemSize}</div>
            {
                props.canBeDelivered ?
                    <div>
                        Item can be delivered
                    </div> : null
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        imageUrl: state.postedItem.imageUrl,
        itemTitle: state.postedItem.title,
        dailyPrice: state.postedItem.rentalDailyPrice,
        deposit: state.postedItem.deposit,
        condition: state.postedItem.condition,
        description: state.postedItem.description,
        itemSize: state.postedItem.itemSize,
        canBeDelivered: state.postedItem.canBeDelivered,
    }
};

export default connect(mapStateToProps, null)(Preview)