import React from "react";
import '../styles/Menu.scss'
import {Link} from "react-router-dom";
import axios from "axios";

class Menu extends React.Component {
    onLogout = () => {
        console.log("logout clicked");
        axios.get(process.env.REACT_APP_SERVER_URL + '/users/logout', {withCredentials: true})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        return (
            <div className="menu-container">
                <Link to="login" id='menu-login-option'>Log in</Link>
                <Link to="sign-up" id='menu-signup-option'>Sign Up</Link>
                <Link to="list-item">List Item</Link>
                <div onClick={this.onLogout}>Logout</div>
                <div>How it works</div>
                <div>Trust & Safety</div>
                <div>Help</div>
                <div>Terms & Privacy</div>
            </div>
        );
    }
}

export default Menu;