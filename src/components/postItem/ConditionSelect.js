import React from "react";
import Select from "react-select";
import PropTypes from 'prop-types';

const conditionOptions = [
    {value: "like-new", label: "Like New"},
    {value: "normal-wear", label: "Normal Wear"},
    {value: "functional", label: "Functional"}
];

const ConditionSelect = (props) => {
    const condition = props.condition;
    const handleConditionChange = (selected) => {
        props.onConditionChange(selected);
    };

    return (
        <div>
            <label>Condition</label>
            <Select
                onChange={handleConditionChange}
                options={conditionOptions}
                value={condition}
                isSearchable={false}
            />
        </div>
    )
};

ConditionSelect.propTypes = {
    condition: PropTypes.any.isRequired,
    onConditionChange: PropTypes.func.isRequired
};

export default ConditionSelect