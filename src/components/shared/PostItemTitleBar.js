import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";

const PostItemTitleBar = withRouter((props) => {
    return (
        <div id='date-range-picker-title-bar' className='fixed-title-bar'>
            {props.hideBackButton ? <span/> :
                <span onClick={() => {
                    props.history.push(props.backLink)
                }}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </span>
            }
            <span className='fixed-title-bar__title--font'>Post Items</span>
            <span onClick={() => {
                props.history.push('/')
            }}>Cancel</span>
        </div>
    )
});

export default PostItemTitleBar