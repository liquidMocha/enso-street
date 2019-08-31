import React from "react";
import './styles/Menu.scss'

class Menu extends React.Component {
    render() {
        return (
            <div className="menu-container">
                <div id='menu-login-option'>Log in</div>
                <div>Sign up</div>
                <div>How it works</div>
                <div>Trust & Safety</div>
                <div>Help</div>
                <div>Terms & Privacy</div>
            </div>
        );
    }
}

export default Menu;