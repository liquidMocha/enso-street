import React from "react";
import '../styles/Menu.scss'
import {Link} from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            <div className="menu-container">
                <Link to="login" id='menu-login-option'>Log in</Link>
                <Link to="sign-up" id='menu-signup-option'>Sign Up</Link>
                <div>How it works</div>
                <div>Trust & Safety</div>
                <div>Help</div>
                <div>Terms & Privacy</div>
            </div>
        );
    }
}

export default Menu;