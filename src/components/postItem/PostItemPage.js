import React from "react";
import '../../styles/Input.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";


const PostItemPage = (props) => {
    return (
        <div>
            <div id='date-range-picker-title-bar' className='fixed-title-bar'>
                <span>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </span>
                <span className='fixed-title-bar__title--font'>Post Items</span>
                <span>Cancel</span>
            </div>
            <div className='center-aligned'>
                <label>Title</label>
                <input className='input-field' type='text' id='item-title-input'/>
            </div>
        </div>
    )
};

export default PostItemPage