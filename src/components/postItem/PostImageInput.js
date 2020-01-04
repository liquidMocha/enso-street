import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';


const PostImageInput = (props) => {
    const imageUrl = props.imageUrl;

    return (
        <div>
            {imageUrl ? <img src={imageUrl} alt='User provided item'/> : null}
            <Link to='/use-my-photo'
                  className='center-aligned'
                  id='use-my-photo'>
                <FontAwesomeIcon icon={faImage}/>
                Use my photo
            </Link>
        </div>
    )
};

PostImageInput.propTypes = {
    imageUrl: PropTypes.string
};

export default PostImageInput