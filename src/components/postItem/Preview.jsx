import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../../styles/Image.scss';
import './Preview.scss';
import { useHistory } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import PostItemTitleBar from '../shared/PostItemTitleBar';

const Preview = (props) => {
  const { item } = props;
  const history = useHistory();

  const [displaySpinner, setDisplaySpinner] = useState(false);

  const renderCategories = () => item.categories.map((category) => <div key={category.value}>{category.label}</div>);

  const onClickingEdit = () => {
    history.push('/edit-complete-item');
  };

  const onClickingPost = async () => {
    setDisplaySpinner(true);
    await props.onPostingItem();
    setDisplaySpinner(false);
  };

  return (
    <div className="column-layout left-aligned" id="preview-root">
      <PostItemTitleBar
        backLink="/price-and-delivery"
        title="Post Items"
        backLinkState={{ item }}
      />
      <img src={item.imageUrl} alt="Posted Item" />
      <div className="bold">{item.title}</div>
      <div className="horizontal-layout" id="preview-prices">
        <span>
          $
          {item.rentalDailyPrice}
          {' '}
          per day
        </span>
        <span>
          $
          {item.deposit}
          {' '}
          deposit
        </span>
      </div>
      <div>
        <span className="bold key-value-column">Categories</span>
        {renderCategories()}
      </div>
      <div>
        <span className="bold key-value-column">Condition</span>
        {item.condition.label}
      </div>
      <div>
        <span className="bold">Description</span>
        {item.description}
      </div>
      {item.canBeDelivered
        ? (
          <div id="preview-delivery-prices-section">
            <span className="bold">This item can be delivered</span>
            <div id="preview-delivery-prices">
              <span>
                $
                {item.deliveryStarting}
                {' '}
                within 3 mile
              </span>
              <span>
                $
                {item.deliveryAdditional}
                {' '}
                per additional mile
              </span>
            </div>
          </div>
        )
        : null}
      <div className="horizontal-layout" id="preview-buttons">
        <button className="preview-button" type="button" onClick={onClickingEdit} disabled={displaySpinner}>Edit</button>
        <button className="preview-button" type="button" onClick={onClickingPost} disabled={displaySpinner}>
          {displaySpinner ? (
            <ClipLoader
              loading
              size={15}
            />
          ) : 'Post'}
        </button>
      </div>
    </div>
  );
};

Preview.propTypes = {
  item: PropTypes.any,
  onPostingItem: PropTypes.func.isRequired,
};

export default Preview;
