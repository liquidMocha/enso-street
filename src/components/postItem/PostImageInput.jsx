import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { resizeAndUploadImage } from '../../services/ImageService';

const PostImageInput = ({ imageUrl, onLocalImageLoad, useMyPhotoPath }) => (
  <div>
    {imageUrl
      ? (
        <img
          src={imageUrl}
          alt="User provided item"
          onLoad={async () => {
            if (imageUrl.startsWith('blob')) {
              const uploadedImageUrl = await resizeAndUploadImage(imageUrl);
              onLocalImageLoad(uploadedImageUrl);
            }
          }}
        />
      ) : null}
    <Link
      to={useMyPhotoPath}
      className="center-aligned"
      id="use-my-photo"
    >
      <FontAwesomeIcon icon={faImage} />
      Use my photo
    </Link>
  </div>
);

PostImageInput.propTypes = {
  imageUrl: PropTypes.string,
  useMyPhotoPath: PropTypes.string.isRequired,
  onLocalImageLoad: PropTypes.func.isRequired,
};

PostImageInput.defaultProps = {
  imageUrl: '',
};

export default PostImageInput;
