import React from "react";
import {Link} from "react-router-dom";
import './styles/HomePage.scss';

const MenuPage = () => {

    return (
        <div className='home-page'>
            <div id='home-page-body'>
                <div id='home-page-button-group'>
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
            <div id='home-page-policy-section'>
                <div>Policies</div>
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
                <div>Cookie Policy</div>
            </div>
        </div>
    )
};

export default MenuPage;