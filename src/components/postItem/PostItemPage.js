import React from 'react';
import PropTypes from 'prop-types';
import NextButton from './NextButton';
import PostImageInput from './PostImageInput';
import ProgressBar from './ProgressBar';
import '../../styles/Input.scss';
import '../../styles/Button.scss';
import '../../styles/App.scss';
import '../../styles/Image.scss';
import InputWithError from '../shared/InputWithError';
import PostItemTitleBar from '../shared/PostItemTitleBar';

const PostItemPage = ({
  onTitleChange, item, useMyPhotoPath, onLocalImageLoad,
}) => {
  const titleIsEmpty = () => item.title === '';

  return (
    <div>
      <PostItemTitleBar hideBackButton title="Post Items" />
      <ProgressBar />
      <div>
        <label>Title</label>
        <InputWithError
          id="item-title-input"
          type="text"
          onChange={onTitleChange}
          value={item.title}
          shouldError={titleIsEmpty}
        />
        <PostImageInput
          imageUrl={item.imageUrl}
          useMyPhotoPath={useMyPhotoPath}
          onLocalImageLoad={onLocalImageLoad}
        />
        <NextButton destination="/details" />
      </div>
    </div>
  );
};

PostItemPage.propTypes = {
  item: PropTypes.shape({ title: PropTypes.string, imageUrl: PropTypes.string }).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  useMyPhotoPath: PropTypes.string.isRequired,
  onLocalImageLoad: PropTypes.func.isRequired,
};

export default PostItemPage;
