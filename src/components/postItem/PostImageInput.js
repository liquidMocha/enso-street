import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const PostImageInput = () => {
    const imageUrl = useSelector(state => state.postedItem.imageUrl);

    return (
        <div>
            {imageUrl ? <img src={imageUrl} alt='User provided item'/> : null}
            <Link to='/post-item/use-my-photo' className='center-aligned' id='use-my-photo'>
                <FontAwesomeIcon icon={faImage}/>
                Use my photo
            </Link>
        </div>
    )
};

export default PostImageInput