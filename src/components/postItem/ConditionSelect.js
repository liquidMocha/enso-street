import React from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemCondition} from "../../redux/postItemActions";

const ConditionSelect = () => {
    const dispatch = useDispatch();

    const condition = useSelector(state => state.postedItem.condition);
    const handleConditionChange = (selected) => {
        dispatch(updatePostedItemCondition(selected));
    };
    const conditionOptions = [
        {value: "like-new", label: "Like new"},
        {value: "normal-wear", label: "Normal wear"},
        {value: "functional", label: "Functional"}
    ];

    return (
        <div>
            <label>Condition</label>
            <Select
                onChange={handleConditionChange}
                options={conditionOptions}
                value={condition}
            />
        </div>
    )
};

export default ConditionSelect