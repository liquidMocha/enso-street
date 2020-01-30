import React, {useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import MyItems from "./MyItems";
import EditItem from "../../postItem/EditItem";
import {updateItem} from "../../../services/ItemService";
import {defaultItem} from "../../postItem/PostItemConstants";
import UseMyPhoto from "../../postItem/UseMyPhoto";
import ChooseLocationPage from "../../postItem/ChooseLocationPage";
import EditAddressPage from "../../postItem/EditAddressPage";
import {resizeAndUploadImage} from "../../../services/ImageService";

const MyItemsRouter = () => {
    let history = useHistory();
    const [editedItem, setEditedItem] = useState();
    const [editedLocation, setEditedLocation] = useState();
    const updateTitle = (value) => setEditedItem(prevState => ({...prevState, title: value}));
    const updateImageUrl = (value) => setEditedItem(prevState => ({...prevState, imageUrl: value}));
    const onCategoryChange = (selectedOption) =>
        setEditedItem(prevState => ({...prevState, categories: selectedOption}));
    const onConditionChange = (selectedCondition) =>
        setEditedItem(prevState => ({...prevState, condition: selectedCondition}));
    const onDescriptionChange = (description) => setEditedItem(prevState => ({...prevState, description}));
    const onDailyRentalChange = (price) =>
        setEditedItem(prevState => ({...prevState, rentalDailyPrice: Number(price)}));
    const onDepositChange = (price) => setEditedItem(prevState => ({...prevState, deposit: Number(price)}));
    const onCanBeDeliveredChange = () =>
        setEditedItem(prevState => ({...prevState, canBeDelivered: !editedItem.canBeDelivered}));
    const onDeliveryStartingPriceChange = (price) =>
        setEditedItem(prevState => ({...prevState, deliveryStarting: Number(price)}));
    const onDeliveryAdditionalPriceChange = (price) =>
        setEditedItem(prevState => ({...prevState, deliveryAdditional: Number(price)}));
    const onLocationChange = (location) => setEditedItem(prevState => ({...prevState, location: location}));

    const onClickMyItemCard = (item) => {
        setEditedItem(item);
        history.push('/my-item-edit')
    };

    const onPostingItem = () => {
        return updateItem(editedItem)
            .then(() => {
                setEditedItem(defaultItem);
                history.push('/my-items');
            })
            .catch((error) => {
                console.log('failed posting item');
                console.error(error);
            });
    };

    const onSelectEditLocation = (location) => {
        setEditedLocation(location);

        history.push(editAddressPath);
    };

    const onLocalImageLoad = async (localImageUrl) => {
        await resizeAndUploadImage(localImageUrl);
    };

    const useMyPhotoPath = '/my-item-edit/use-my-photo';
    const chooseLocationPath = '/my-item/choose-location';
    const editItemPath = '/my-item-edit';
    const editAddressPath = '/my-item/edit-address';

    return (
        <Switch>
            <Route exact path='/my-items'>
                <MyItems onClickItemCard={onClickMyItemCard}/>
            </Route>
            <Route exact path={editItemPath}>
                <EditItem
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
                    useMyPhotoPath={useMyPhotoPath}
                    chooseLocationPath={chooseLocationPath}
                    onLocalImageLoad={onLocalImageLoad}/>
            </Route>
            <Route exact path={useMyPhotoPath}>
                <UseMyPhoto onImageUrlChange={updateImageUrl}/>
            </Route>
            <Route exact path={chooseLocationPath}>
                <ChooseLocationPage
                    onLocationChange={onLocationChange}
                    backLink={editItemPath}
                    pathAfterApplyLocation={editItemPath}
                    onChooseLocationToEdit={onSelectEditLocation}
                />
            </Route>
            <Route exact path={editAddressPath}>
                <EditAddressPage
                    location={editedLocation}
                    pathAfterConfirm={chooseLocationPath}
                />
            </Route>
        </Switch>
    )
};

export default MyItemsRouter