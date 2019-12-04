import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemDescription} from "../../redux/postItemActions";

const DescriptionTextInput = () => {
    const dispatch = useDispatch();

    const description = useSelector(state => state.postedItem.description);

    const handleDescriptionChange = (event) => {
        dispatch(updatePostedItemDescription(event.target.value));
    };

    const descriptionPlaceholder = "Ex. Size 53'' * 30'' * 45'' LWH";

    return (
        <div>
            <label>Description (optional)</label>
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder={descriptionPlaceholder}
                maxLength={2500}/>
        </div>
    )
};

export default DescriptionTextInput