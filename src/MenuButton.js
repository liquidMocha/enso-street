import React from "react";
import './styles/MenuButton.scss';

class MenuButton extends React.Component {

    render() {
        return (
            <div className="menu-button-container" onClick={this.props.onClick}>
                <div className="menu-button-bar"/>
                <div className="menu-button-bar"/>
                <div className="menu-button-bar"/>
            </div>
        );
    }
}

export default MenuButton;