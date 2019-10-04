import React from "react";
import {Link} from "react-router-dom";
import './styles/MenuPage.scss';

const MenuPage = () => {

    return (
        <div className='menu-page'>
            <div id="menu-page-body">
                <div id='menu-page-button-group'>
                    <Link to='login' id='login-button'>
                        <div className='home-page-button'>
                            Log in
                        </div>
                    </Link>
                    <Link to='sign-up' id='sign-up-button'>
                        <div className='home-page-button'>
                            Sign up
                        </div>
                    </Link>
                </div>
                <div>How does it work?</div>
            </div>
            <div id='menu-page-policy-section'>
                <div>Policies</div>
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
                <div>Cookie Policy</div>
            </div>
        </div>
    )
};

export default MenuPage;