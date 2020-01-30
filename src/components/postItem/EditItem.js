import PropTypes from 'prop-types';
import React, {useState} from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import PostImageInput from "./PostImageInput";
import InputWithError from "../shared/InputWithError";
import CategorySelect from "./CategorySelect";
import ConditionSelect from "./ConditionSelect";
import RentalPriceInputSection from "./RentalPriceInputSection";
import DescriptionTextInput from "./DescriptionTextInput";
import DeliveryToggle from "./DeliveryToggle";
import DeliveryFeeInputSection from "./DeliveryFeeInputSection";
import LocationInput from "./LocationInput";
import ClipLoader from "react-spinners/ClipLoader";

const EditItem = (props) => {
    const item = props.item;
    const title = item.title;
    const canBeDelivered = item.canBeDelivered;

    const [displaySpinner, setDisplaySpinner] = useState(false);

    const onClickingPost = async () => {
        setDisplaySpinner(true);
        await props.onClickingPost();
        setDisplaySpinner(false);
    };

    return (
        <div>
            <PostItemTitleBar backLink={props.backLink}
                              title='Post Items'
            />
            <PostImageInput imageUrl={item.imageUrl} useMyPhotoPath={props.useMyPhotoPath}/>
            <InputWithError id='item-title-input' type='text'
                            onChange={props.onTitleChange}
                            value={title}
                            shouldError={() => {
                                return title === "";
                            }}
            />
            <CategorySelect
                categories={item.categories}
                onCategoryChange={props.onCategoryChange}/>
            <ConditionSelect
                onConditionChange={props.onConditionChange}
                condition={item.condition}/>
            <RentalPriceInputSection
                deposit={item.deposit}
                rentalDailyPrice={item.rentalDailyPrice}
                onDailyRentalChange={props.onDailyRentalChange}
                onDepositChange={props.onDepositChange}
            />
            <DescriptionTextInput
                description={item.description}
                onDescriptionChange={props.onDescriptionChange}
            />
            <LocationInput
                chooseLocationPath={props.chooseLocationPath}
                location={item.location}
            />
            <DeliveryToggle
                canBeDelivered={canBeDelivered}
                updatePostedItemCanBeDelivered={props.onCanBeDeliveredChange}
            />
            {canBeDelivered ?
                <DeliveryFeeInputSection
                    deliveryStarting={item.deliveryStarting}
                    deliveryAdditional={item.deliveryAdditional}
                    onDeliveryStartingPriceChange={props.onDeliveryStartingPriceChange}
                    onDeliveryAdditionalPriceChange={props.onDeliveryAdditionalPriceChange}
                /> : null
            }
            <button className='preview-button' onClick={onClickingPost} disabled={displaySpinner}>
                {displaySpinner ? <ClipLoader
                    loading={true}
                    size={15}
                /> : 'Update'}
            </button>
        </div>
    )
};

EditItem.propTypes = {
    item: PropTypes.any,
    backLink: PropTypes.string,
    useMyPhotoPath: PropTypes.string.isRequired,
    chooseLocationPath: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func,
    onCategoryChange: PropTypes.func,
    onConditionChange: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onDailyRentalChange: PropTypes.func,
    onDepositChange: PropTypes.func,
    onCanBeDeliveredChange: PropTypes.func,
    onDeliveryStartingPriceChange: PropTypes.func,
    onDeliveryAdditionalPriceChange: PropTypes.func,
    onClickingPost: PropTypes.func
};

export default EditItem