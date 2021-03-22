import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { assoc, not } from 'ramda';
import PostItemPage from './PostItemPage';
import UseMyPhoto from './UseMyPhoto';
import PostItemDetailPage from './PostItemDetailPage';
import PriceAndDelivery from './PriceAndDelivery';
import Preview from './Preview';
import { defaultItem } from './PostItemConstants';
import { postItem } from '../../services/ItemService';
import EditItem from './EditItem';
import PostItemProgressContext from './PostItemProgressContext';
import ChooseLocation from '../shared/ChooseLocation';

const PostItemRouter = () => {
  const history = useHistory();
  const [item, setItem] = useState(defaultItem);
  const updateTitle = (value) => setItem(assoc('title', value, item));
  const updateImageUrl = (value) => setItem(assoc('imageUrl', value, item));
  const onCategoryChange = (selectedOption) => setItem(assoc('categories', selectedOption, item));
  const onConditionChange = (selectedCondition) => setItem(assoc('condition', selectedCondition, item));
  const onDescriptionChange = (description) => setItem(assoc('description', description, item));
  const onDailyRentalChange = (price) => setItem(assoc('rentalDailyPrice', Number(price), item));
  const onDepositChange = (price) => setItem(assoc('deposit', Number(price), item));
  const onCanBeDeliveredChange = () => setItem(assoc('canBeDelivered', not(item.canBeDelivered), item));
  const onDeliveryStartingPriceChange = (price) => setItem(assoc('deliveryStarting', Number(price), item));
  const onDeliveryAdditionalPriceChange = (price) => setItem(assoc('deliveryAdditional', Number(price), item));
  const onLocationChange = (location) => setItem(assoc('location', { address: location }, item));
  const [uploadImageUrl, setUploadImageUrl] = useState();

  const onPostingItem = () => {
    item.imageUrl = uploadImageUrl;
    return postItem(item)
      .then(() => {
        setItem(defaultItem);
        history.push('/my-items');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const useMyPhotoPath = '/use-my-photo';
  const chooseLocationPath = '/choose-location';
  const priceAndDeliveryPath = '/price-and-delivery';
  const previewPath = '/preview';

  return (
    <PostItemProgressContext.Provider value={{
      firstStepDone: item.title !== '' && item.imageUrl !== '',
      secondStepDone: item.categories.length !== 0,
      thirdStepDone: true,
    }}
    >
      <Switch>
        <Route exact path="/post-item">
          <PostItemPage
            item={item}
            onTitleChange={updateTitle}
            useMyPhotoPath={useMyPhotoPath}
            onLocalImageLoad={setUploadImageUrl}
          />
        </Route>
        <Route exact path={useMyPhotoPath}>
          <UseMyPhoto onImageUrlChange={updateImageUrl} />
        </Route>
        <Route exact path="/details">
          <PostItemDetailPage
            item={item}
            onCategoryChange={onCategoryChange}
            onConditionChange={onConditionChange}
            onDescriptionChange={onDescriptionChange}
          />
        </Route>
        <Route exact path={priceAndDeliveryPath}>
          <PriceAndDelivery
            item={item}
            onDailyRentalChange={onDailyRentalChange}
            onDepositChange={onDepositChange}
            onCanBeDeliveredChange={onCanBeDeliveredChange}
            onDeliveryStartingPriceChange={onDeliveryStartingPriceChange}
            onDeliveryAdditionalPriceChange={onDeliveryAdditionalPriceChange}
          />
        </Route>
        <ChooseLocation
          exitPath={priceAndDeliveryPath}
          onLocationChange={onLocationChange}
          path={chooseLocationPath}
        />
        <Route exact path={previewPath}>
          <Preview item={item} onPostingItem={onPostingItem} />
        </Route>
        <Route exact path="/edit-complete-item">
          <EditItem
            item={item}
            backLink={previewPath}
            onTitleChange={updateTitle}
            onCategoryChange={onCategoryChange}
            onConditionChange={onConditionChange}
            onDescriptionChange={onDescriptionChange}
            onDailyRentalChange={onDailyRentalChange}
            onDepositChange={onDepositChange}
            onCanBeDeliveredChange={onCanBeDeliveredChange}
            onDeliveryStartingPriceChange={onDeliveryStartingPriceChange}
            onDeliveryAdditionalPriceChange={onDeliveryAdditionalPriceChange}
            onClickingPost={onPostingItem}
            useMyPhotoPath={useMyPhotoPath}
            chooseLocationPath={chooseLocationPath}
            onLocalImageLoad={updateImageUrl}
          />
        </Route>
      </Switch>
    </PostItemProgressContext.Provider>
  );
};

export default PostItemRouter;
