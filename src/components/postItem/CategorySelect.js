import React from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemCategories} from "../../redux/postItemActions";

const CategorySelect = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.postedItem.categories);

    const handleCategoryChange = (selectedOption) => {
        dispatch(updatePostedItemCategories(selectedOption));
    };

    const categoryOptions = [
        {value: "baby-and-kids", label: "Baby & Kids"},
        {value: "business-equipment", label: "Business Equipment"},
        {value: "diy-home-improvement", label: "DIY Home Improvement"},
        {value: "farming", label: "Farming"},
        {value: "free", label: "Free"},
        {value: "garden-and-patio", label: "Garden & Patio"},
        {value: "home-maintenance", label: "Home Maintenance"},
        {value: "music-instruments", label: "Music Instruments"},
        {value: "novelty-electronics", label: "Novelty Electronics"}
    ];

    return (
        <div>
            <label>Categories</label>
            <Select
                placeholder='Select category'
                closeMenuOnSelect={false}
                isMulti={true}
                onChange={handleCategoryChange}
                options={categoryOptions}
                value={categories}
            />
        </div>
    )
};

export default CategorySelect