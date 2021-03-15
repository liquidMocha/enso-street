import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { assoc } from 'ramda';
import MyItems from './MyItems';
import EditItem from '../../../postItem/EditItem';
import { updateItem } from '../../../../services/ItemService';
import { defaultItem } from '../../../postItem/PostItemConstants';
import UseMyPhoto from '../../../postItem/UseMyPhoto';
import ChooseLocation from '../../../shared/ChooseLocation';

const MyItemsRouter = () => {
  const history = useHistory();
  const [editedItem, setEditedItem] = useState();
  const [eventualUploadLink, setUploadLink] = useState();

  const useMyPhotoPath = '/my-item-edit/use-my-photo';
  const chooseLocationPath = '/my-item/choose-location';
  const editItemPath = '/my-item-edit';
  const rootPath = '/my-items';

  const onClickMyItemCard = (item) => {
    setEditedItem(item);
    history.push(editItemPath);
  };

  const onPostingItem = async () => {
    let imageUrl;
    if (eventualUploadLink) {
      imageUrl = (await eventualUploadLink).imageUrl;
    }
    return updateItem(editedItem, imageUrl)
      .then(() => {
        setEditedItem(defaultItem);
        history.push(rootPath);
      })
      .catch(() => {
        history.push(rootPath);
      });
  };

  return (
    <Switch>
      <Route exact path={rootPath}>
        <MyItems onClickItemCard={onClickMyItemCard} />
      </Route>
      <Route exact path={editItemPath}>
        <EditItem
          backLink={rootPath}
          item={editedItem}
          onTitleChange={(value) => setEditedItem(assoc('title', value))}
          onCategoryChange={(selectedOption) => setEditedItem(assoc('categories', selectedOption))}
          onConditionChange={(selectedCondition) => setEditedItem(assoc('condition', selectedCondition))}
          onDescriptionChange={(description) => setEditedItem(assoc('description', description))}
          onDailyRentalChange={(price) => setEditedItem(assoc('rentalDailyPrice', Number(price)))}
          onDepositChange={(price) => setEditedItem(assoc('deposit', Number(price)))}
          onCanBeDeliveredChange={() => setEditedItem(assoc('canBeDelivered', !editedItem.canBeDelivered))}
          onDeliveryStartingPriceChange={(price) => setEditedItem(assoc('deliveryStarting', Number(price)))}
          onDeliveryAdditionalPriceChange={(price) => setEditedItem(assoc('deliveryAdditional', Number(price)))}
          onClickingPost={onPostingItem}
          useMyPhotoPath={useMyPhotoPath}
          chooseLocationPath={chooseLocationPath}
          onLocalImageLoad={setUploadLink}
        />
      </Route>
      <Route exact path={useMyPhotoPath}>
        <UseMyPhoto onImageUrlChange={(value) => setEditedItem(assoc('imageUrl', value))} />
      </Route>
      <ChooseLocation
        exitPath={editItemPath}
        onLocationChange={(location) => {
          setEditedItem(assoc('location', { address: location }));
        }}
        path={chooseLocationPath}
      />
    </Switch>
  );
};

export default MyItemsRouter;
