import React, {useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import MyItems from "./MyItems";
import EditCompleteItem from "../../postItem/EditCompleteItem";
import {updateItem} from "../../../services/ItemService";
import {defaultItem} from "../../postItem/PostItemConstants";
import UseMyPhoto from "../../postItem/UseMyPhoto";

const MyItemsRouter = () => {
    let history = useHistory();
    const [editedItem, setEditedItem] = useState();
    const updateTitle = (value) => setEditedItem({...editedItem, title: value});
    const updateImageUrl = (value) => setEditedItem({...editedItem, imageUrl: value});
    const onCategoryChange = (selectedOption) => setEditedItem({...editedItem, categories: selectedOption});
    const onConditionChange = (selectedCondition) => setEditedItem({...editedItem, condition: selectedCondition});
    const onDescriptionChange = (description) => setEditedItem({...editedItem, description});
    const onDailyRentalChange = (price) => setEditedItem({...editedItem, rentalDailyPrice: Number(price)});
    const onDepositChange = (price) => setEditedItem({...editedItem, deposit: Number(price)});
    const onCanBeDeliveredChange = () => setEditedItem({...editedItem, canBeDelivered: !editedItem.canBeDelivered});
    const onDeliveryStartingPriceChange = (price) => setEditedItem({...editedItem, deliveryStarting: Number(price)});
    const onDeliveryAdditionalPriceChange = (price) => setEditedItem({
        ...editedItem,
        deliveryAdditional: Number(price)
    });

    const onClickMyItemCard = (item) => {
        setEditedItem(item);
        history.push('/my-item-edit')
    };

    const onPostingItem = () => {
        history.push('/my-items');

        updateItem(editedItem)
            .then(() => {
                setEditedItem(defaultItem);
            })
            .catch((error) => {
                console.log('failed posting item');
                console.error(error);
            });
    };

    const useMyPhotoPath = '/my-item-edit/use-my-photo';

    return (
        <Switch>
            <Route exact path='/my-items'>
                <MyItems onClickItemCard={onClickMyItemCard}/>
            </Route>
            <Route exact path='/my-item-edit'>
                <EditCompleteItem
                    backLink={'/my-items'}
                    item={editedItem}
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
                    useMyPhotoPath={useMyPhotoPath}/>
            </Route>
            <Route exact path={useMyPhotoPath}>
                <UseMyPhoto onImageUrlChange={updateImageUrl}/>
            </Route>
        </Switch>
    )
};

export default MyItemsRouter