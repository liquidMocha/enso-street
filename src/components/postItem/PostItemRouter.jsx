import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import PostItemPage from './PostItemPage';
import UseMyPhoto from './UseMyPhoto';
import PostItemDetailPage from './PostItemDetailPage';
import PriceAndDelivery from './PriceAndDelivery';
import Preview from './Preview';
import { defaultItem } from './PostItemConstants';
import { postItem } from '../../services/ItemService';
import EditItem from './EditItem';
import ChooseLocationPage from './ChooseLocationPage';
import EditAddressPage from './EditAddressPage';
import PostItemProgressContext from './PostItemProgressContext';
import { resizeAndUploadImage } from '../../services/ImageService';

const PostItemRouter = () => {
  const history = useHistory();
  const [item, setItem] = useState(defaultItem);
  const [editedLocation, setEditedLocation] = useState();
  const updateTitle = (value) => setItem({ ...item, title: value });
  const updateImageUrl = (value) => setItem({ ...item, imageUrl: value });
  const onCategoryChange = (selectedOption) => setItem({ ...item, categories: selectedOption });
  const onConditionChange = (selectedCondition) => setItem({ ...item, condition: selectedCondition });
  const onDescriptionChange = (description) => setItem({ ...item, description });
  const onDailyRentalChange = (price) => setItem({ ...item, rentalDailyPrice: Number(price) });
  const onDepositChange = (price) => setItem({ ...item, deposit: Number(price) });
  const onCanBeDeliveredChange = () => setItem({ ...item, canBeDelivered: !item.canBeDelivered });
  const onDeliveryStartingPriceChange = (price) => setItem({ ...item, deliveryStarting: Number(price) });
  const onDeliveryAdditionalPriceChange = (price) => setItem({ ...item, deliveryAdditional: Number(price) });
  const onLocationChange = (location) => setItem({ ...item, location });

  const onPostingItem = () => postItem(item).then(() => {
    setItem(defaultItem);
    history.push('/my-items');
  }).catch((error) => {
    console.log('failed posting item');
    console.error(error);
  });

  const onLocalImageLoad = async (imageUrl) => {
    if (imageUrl.startsWith('blob')) {
      const uploadedImageUrl = await resizeAndUploadImage(imageUrl);
      updateImageUrl(uploadedImageUrl);
    }
  };

  const useMyPhotoPath = '/use-my-photo';
  const chooseLocationPath = '/choose-location';
  const priceAndDeliveryPath = '/price-and-delivery';
  const previewPath = '/preview';
  const editAddressPath = '/edit-address';

  const onSelectEditLocation = (location) => {
    setEditedLocation(location);

    history.push(editAddressPath);
  };

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
            onLocalImageLoad={onLocalImageLoad}
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
        <Route exact path={chooseLocationPath}>
          <ChooseLocationPage
            onLocationChange={onLocationChange}
            backLink={priceAndDeliveryPath}
            pathAfterApplyLocation={priceAndDeliveryPath}
            onChooseLocationToEdit={onSelectEditLocation}
          />
        </Route>
        <Route exact path={editAddressPath}>
          <EditAddressPage
            location={editedLocation}
            pathAfterConfirm={chooseLocationPath}
          />
        </Route>
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
            onLocalImageLoad={onLocalImageLoad}
          />
        </Route>
      </Switch>
    </PostItemProgressContext.Provider>
  );
};

export default PostItemRouter;
