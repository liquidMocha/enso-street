import React from "react";
import './MenuButton.scss';

const MenuButton = (props) => {

    return (
        <div className="menu-button-container" onClick={props.onClick}>
            <div className="menu-button-bar"/>
            <div className="menu-button-bar"/>
            <div className="menu-button-bar"/>
        </div>
    );
};

export default MenuButton;