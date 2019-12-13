import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import PostImageInput from "./PostImageInput";
import {useDispatch, useSelector} from "react-redux";
import InputWithError from "../shared/InputWithError";
import {updatePostedItemCanBeDelivered, updatePostedItemTitle} from "../../redux/postItemActions";
import CategorySelect from "./CategorySelect";
import ConditionSelect from "./ConditionSelect";
import RentalPriceInputSection from "./RentalPriceInputSection";
import DescriptionTextInput from "./DescriptionTextInput";
import DeliveryToggle from "./DeliveryToggle";
import DeliveryFeeInputSection from "./DeliveryFeeInputSection";
import {postItem} from "../../services/ItemService";
import {withRouter} from "react-router-dom";

const EditCompleteItem = withRouter((props) => {
    const dispatch = useDispatch();
    const title = useSelector(state => state.postedItem.title);
    const item = useSelector(state => state.postedItem);

    const canBeDelivered = useSelector(state => state.postedItem.canBeDelivered);

    const handlePostedItemCanBeDeliveredChange = (event) => {
        dispatch(updatePostedItemCanBeDelivered(event));
    };

    const onClickingPost = () => {
        postItem(item).then(() => {
            props.history.push('/my-items');
        }).catch((error) => {
            console.log('failed posting item');
            console.error(error);
        });
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/preview" title='Post Items'/>
            <PostImageInput/>
            <InputWithError id='item-title-input' type='text'
                            onChange={(value) => dispatch(updatePostedItemTitle(value))}
                            value={title}
                            shouldError={() => {
                                return title === "";
                            }}
            />
            <CategorySelect/>
            <ConditionSelect/>
            <RentalPriceInputSection/>
            <DescriptionTextInput/>
            <DeliveryToggle canBeDelivered={canBeDelivered}
                            updatePostedItemCanBeDelivered={handlePostedItemCanBeDeliveredChange}/>
            {canBeDelivered ? <DeliveryFeeInputSection/> : null}
            <button className='preview-button' onClick={onClickingPost}>Post</button>
        </div>
    )
});

export default EditCompleteItem