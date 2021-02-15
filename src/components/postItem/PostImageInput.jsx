import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Jimp from 'jimp';
import { getUploadLink, uploadImage } from '../../services/ImageService';

const PostImageInput = ({ imageUrl, onLocalImageLoad, useMyPhotoPath }) => (
  <div>
    {imageUrl
      ? (
        <img
          src={imageUrl}
          alt="User provided item"
          onLoad={async () => {
            if (imageUrl.startsWith('blob')) {
              const image = await Jimp.read(imageUrl);
              const compressedImage = image.getBufferAsync(Jimp.MIME_PNG);
              const uploadLink = await getUploadLink();
              onLocalImageLoad(uploadLink.imageUrl);

              await uploadImage(await compressedImage, (await uploadLink).uploadRequest);
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
