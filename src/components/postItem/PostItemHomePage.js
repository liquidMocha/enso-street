import React, {useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import PostItemPage from "./PostItemPage";
import UseMyPhoto from "./UseMyPhoto";
import PostItemDetailPage from "./PostItemDetailPage";
import PriceAndDelivery from "./PriceAndDelivery";
import Preview from "./Preview";
import {defaultItem} from "./PostItemConstants";
import {postItem} from "../../services/ItemService";
import EditItem from "./EditItem";
import ChooseLocationPage from "./ChooseLocationPage";
import EditAddressPage from "./EditAddressPage";

const PostItemHomePage = () => {
    let history = useHistory();
    const [item, setItem] = useState(defaultItem);
    const updateTitle = (value) => setItem({...item, title: value});
    const updateImageUrl = (value) => setItem({...item, imageUrl: value});
    const onCategoryChange = (selectedOption) => setItem({...item, categories: selectedOption});
    const onConditionChange = (selectedCondition) => setItem({...item, condition: selectedCondition});
    const onDescriptionChange = (description) => setItem({...item, description});
    const onDailyRentalChange = (price) => setItem({...item, rentalDailyPrice: Number(price)});
    const onDepositChange = (price) => setItem({...item, deposit: Number(price)});
    const onCanBeDeliveredChange = () => setItem({...item, canBeDelivered: !item.canBeDelivered});
    const onDeliveryStartingPriceChange = (price) => setItem({...item, deliveryStarting: Number(price)});
    const onDeliveryAdditionalPriceChange = (price) => setItem({...item, deliveryAdditional: Number(price)});
    const onLocationChange = (location) => setItem({...item, location: location});

    const onPostingItem = () => {
        history.push('/my-items');

        postItem(item).then(() => {
            setItem(defaultItem);
        }).catch((error) => {
            console.log('failed posting item');
            console.error(error);
        });
    };

    const useMyPhotoPath = '/use-my-photo';
    const chooseLocationPath = '/choose-location';
    const priceAndDeliveryPath = '/price-and-delivery';
    const previewPath = '/preview';

    return (
        <Switch>
            <Route exact path="/post-item">
                <PostItemPage item={item} onTitleChange={updateTitle} useMyPhotoPath={useMyPhotoPath}/>
            </Route>
            <Route exact path={useMyPhotoPath}>
                <UseMyPhoto onImageUrlChange={updateImageUrl}/>
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
                <ChooseLocationPage onLocationChange={onLocationChange}
                                    backLink={priceAndDeliveryPath}
                                    pathAfterApplyLocation={priceAndDeliveryPath}/>
            </Route>
            <Route exact path="/edit-address">
                <EditAddressPage/>
            </Route>
            <Route exact path={previewPath}>
                <Preview item={item} onPostingItem={onPostingItem}/>
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
                    chooseLocationPath={chooseLocationPath}/>
            </Route>
        </Switch>
    )
};

export default PostItemHomePage