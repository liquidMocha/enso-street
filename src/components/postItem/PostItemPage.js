import React, {useState} from "react";
import '../../styles/Input.scss';
import {Link, withRouter} from "react-router-dom";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {updatePostedItemTitle} from "../../redux/actions";
import {connect} from "react-redux";


export const PostItemPage = (props) => {
    const [itemTitle, setItemTitle] = useState('');

    return (
        <div>
            <PostItemTitleBar/>
            <div className='center-aligned'>
                <label>Title</label>
                <input className='input-field' type='text' id='item-title-input'
                       onChange={((event) => {
                           setItemTitle(event.target.value);
                       })}
                       onBlur={() => {
                           props.updatePostedItemTitle(itemTitle);
                       }}/>
                <Link to='/post-item/photo'>
                    <div id='next-button' className='home-page-button'>
                        Next
                    </div>
                </Link>
            </div>
        </div>
    )
};

const mapDispatchToProps = {updatePostedItemTitle};

export default withRouter(connect(null, mapDispatchToProps)(PostItemPage))