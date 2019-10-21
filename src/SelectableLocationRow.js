import React from "react";
import './styles/color.scss';

const SelectableLocationRow = (props) => {
    return (
        <div date-test='location-row'
             className={props.selected ? 'highlight-background' : ''}
             onClick={() => {
                 props.onClick();
             }}>
            <div date-test='location-name'>{props.name}</div>
        </div>
    )
};

export default SelectableLocationRow