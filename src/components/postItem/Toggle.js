import React from "react";
import "../../styles/Toggle.scss";

const Toggle = (props) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={props.value} onChange={props.onChange}/>
            <span className="slider round"/>
        </label>
    )
};

export default Toggle