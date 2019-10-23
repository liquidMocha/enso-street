import React from "react";
import './styles/color.scss';

const SelectableLocationRow = (props) => {
    return (
        <div data-test='location-row'
             className={props.selected ? 'highlight-background' : ''}
             onClick={() => {
                 props.onClick(props.zipCode);
             }}>
            <div data-test='location-name'>{props.name}</div>
        </div>
    )
};

export default SelectableLocationRow