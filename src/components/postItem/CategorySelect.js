import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemCategories} from "../../redux/postItemActions";
import {getAllCategories} from "../../services/CategoryService";

const CategorySelect = () => {
    const [allCategoryOptions, setCategories] = useState([]);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.postedItem.categories);

    useEffect(() => {
        getAllCategories().then(result => {
            const options = result.data.map(category => {
                const label = categoryOptions.get(category.name);
                return {value: category.name, label: label};
            }).sort((a, b) => {
                const optionA = a.label;
                const optionB = b.label;
                if (optionA > optionB) {
                    return 1;
                } else if (optionA < optionB) {
                    return -1;
                }
                return 0;
            });
            setCategories(options);
        })
    }, []);

    const handleCategoryChange = (selectedOption) => {
        dispatch(updatePostedItemCategories(selectedOption));
    };

    const categoryOptions = new Map([
        ["appliances", "Appliances"],
        ["arts-and-crafts", "Arts & Crafts"],
        ["audio-equipment", "Audio Equipment"],
        ["baby-and-kids", "Baby & Kids"],
        ["business-equipment", "Business Equipment"],
        ["camping-and-outdoors", "Camping & Outdoors"],
        ["costumes-and-special-occasions", "Costumes & Special Occasions"],
        ["computer-equipment", "Computer Equipment"],
        ["diy-home-improvement", "DIY Home Improvement"],
        ["exercise", "Exercise"],
        ["farming", "Farming"],
        ["free", "Free"],
        ["furniture", "Furniture"],
        ["garden-and-patio", "Garden & Patio"],
        ["games-and-toys", "Games & Toys"],
        ["home-maintenance", "Home Maintenance"],
        ["music-instruments", "Music Instruments"],
        ["novelty-electronics", "Novelty Electronics"],
        ["party-and-events", "Party & Events"],
        ["pet-supplies", "Pet Supplies"],
        ["photography", "Photography"],
        ["rare-find", "Rare Find"],
        ["sports", "Sports"],
        ["tools-and-machinery", "Tools & Machinery"],
        ["video-equipment", "Video Equipment"]
    ]);

    return (
        <div>
            <label>Categories</label>
            <Select
                placeholder='Select category'
                closeMenuOnSelect={false}
                isMulti={true}
                onChange={handleCategoryChange}
                options={allCategoryOptions}
                value={categories}
            />
        </div>
    )
};

export default CategorySelect