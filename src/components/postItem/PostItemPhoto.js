import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";

const PostItemPhoto = (props) => {
    return (
        <div>
            <PostItemTitleBar/>
            <div id='title-row'>Title: {props.postedItemTitle}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {postedItemTitle: state.postedItem.title}
};

export default connect(mapStateToProps, null)(PostItemPhoto);