import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const PostItemTitleBar = (props) => {
    let history = useHistory();

    return (
        <div id='date-range-picker-title-bar' className='fixed-title-bar'>
            {props.hideBackButton ? <span/> :
                <span onClick={() => {
                    history.push(props.backLink)
                }}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </span>
            }
            <span className='fixed-title-bar__title--font'>{props.title}</span>
            <span onClick={() => {
                history.push('/')
            }}>Cancel</span>
        </div>
    )
};

export default PostItemTitleBar