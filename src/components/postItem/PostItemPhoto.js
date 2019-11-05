import React, {useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {connect} from "react-redux";
import '../../styles/Image.scss';
import '../../styles/Input.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const PostItemPhoto = (props) => {
    const [imageUrl, setImageUrl] = useState(null);

    return (
        <div>
            <PostItemTitleBar/>
            {imageUrl ? <img src={imageUrl}/> : null}
            <div id='title-row'>Title: {props.postedItemTitle}</div>
            {
                imageUrl ? null :
                    <div className='image-button'>
                        <input id='take-photo-input' type="file" accept="image/*" capture="camera"
                               onChange={(event) => {
                                   if (event.target.files && event.target.files[0]) {
                                       setImageUrl(URL.createObjectURL(event.target.files[0]));
                                   }
                               }}/>
                        <label htmlFor='take-photo-input'>
                            <FontAwesomeIcon icon={faCamera}/>
                            Take Photo
                        </label>
                    </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        postedItemTitle: state.postedItem.title
    }
};

export default connect(mapStateToProps, null)(PostItemPhoto);