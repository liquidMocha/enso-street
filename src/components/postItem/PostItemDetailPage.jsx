import PropTypes from 'prop-types';
import React from 'react';
import PostItemTitleBar from '../shared/PostItemTitleBar';
import NextButton from './NextButton';
import '../../styles/Input.scss';
import './PostItemDetailPage.scss';
import CategorySelect from './CategorySelect';
import ConditionSelect from './ConditionSelect';
import DescriptionTextInput from './DescriptionTextInput';
import ProgressBar from './ProgressBar';

const PostItemDetailPage = ({
  item,
  onCategoryChange,
  onConditionChange,
  onDescriptionChange,
}) => (
  <div id="post-item-detail-page">
    <PostItemTitleBar
      backLink="/post-item"
      title="Post Items"
    />
    <ProgressBar />
    <CategorySelect
      categories={item.categories}
      onCategoryChange={onCategoryChange}
    />
    <ConditionSelect
      onConditionChange={onConditionChange}
      condition={item.condition}
    />
    <DescriptionTextInput
      description={item.description}
      onDescriptionChange={onDescriptionChange}
    />
    <NextButton destination="/price-and-delivery" disabled={item.categories.length === 0} />
  </div>
);

PostItemDetailPage.propTypes = {
  item: PropTypes.shape({
    categories: PropTypes.array,
    condition: PropTypes.object,
    description: PropTypes.string,
  }).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onConditionChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
};

export default PostItemDetailPage;
