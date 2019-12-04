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

const EditCompleteItem = () => {
    const dispatch = useDispatch();
    const title = useSelector(state => state.postedItem.title);

    const canBeDelivered = useSelector(state => state.postedItem.canBeDelivered);

    const handlePostedItemCanBeDeliveredChange = (event) => {
        dispatch(updatePostedItemCanBeDelivered(event));
    };

    return (
        <div>
            <PostItemTitleBar backLink="/post-item/preview"/>
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
        </div>
    )
};

export default EditCompleteItem