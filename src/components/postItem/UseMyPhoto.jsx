import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Input.scss';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const UseMyPhoto = (props) => {
  const history = useHistory();

  const onSelectingImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      history.goBack();

      const localImageUrl = URL.createObjectURL(event.target.files[0]);
      props.onImageUrlChange(localImageUrl);
    }
  };

  return (
    <div className="column-layout">
      <div className="image-button">
        <input
          id="take-photo-input"
          type="file"
          accept="image/*"
          capture
          onChange={onSelectingImage}
        />
        <label htmlFor="take-photo-input">
          <FontAwesomeIcon icon={faCamera} />
          Take Photo
        </label>
      </div>
      <div className="image-button">
        <input
          id="select-image-input"
          type="file"
          accept="image/*"
          capture={false}
          onChange={onSelectingImage}
        />
        <label htmlFor="select-image-input">
          <FontAwesomeIcon icon={faImages} />
          Select Photo
        </label>
      </div>
    </div>
  );
};

UseMyPhoto.propTypes = {
  onImageUrlChange: PropTypes.func.isRequired,
};

export default UseMyPhoto;
