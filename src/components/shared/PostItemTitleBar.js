import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const PostItemTitleBar = () => {
    return (
        <div id='date-range-picker-title-bar' className='fixed-title-bar'>
                <span>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </span>
            <span className='fixed-title-bar__title--font'>Post Items</span>
            <span>Cancel</span>
        </div>
    )
};

export default PostItemTitleBar