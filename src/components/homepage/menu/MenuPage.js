import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TitleBar from "../../shared/TitleBar";
import axios from "axios";
import './MenuPage.scss';
import PropTypes from 'prop-types';

const MenuPage = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        isUserLoggedIn();
    }, []);

    const isUserLoggedIn = async () => {
        const isLoggedIn = props.isLoggedIn();
        setIsLoggedIn(await isLoggedIn);
    };

    const logout = () => {
        axios.get(props.baseUrl + '/users/logout', {withCredentials: true})
            .then((_) => {
                setIsLoggedIn(false);
            })
    };

    const links = () => {
        if (isLoggedIn) {
            return (
                <section>
                    <Link to={'post-item'} id='post-item-button'>
                        <button>
                            Post Items
                        </button>
                    </Link>
                    <div id='menu-page-button-group'>
                        <Link to={'my-items'} id='post-item-button'>
                            <div className='menu-page-options'>
                                My Items
                            </div>
                        </Link>
                        <div id='logout-button' className='menu-page-options' onClick={logout}>
                            Log Out
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <div id='menu-page-button-group'>
                    <Link to='login' id='login-button'>
                        <button>
                            Log in
                        </button>
                    </Link>
                    <Link to='sign-up' id='sign-up-button'>
                        <button>
                            Sign up
                        </button>
                    </Link>
                </div>
            )
        }
    };

    return (
        <div className='menu-page column-layout'>
            <TitleBar/>
            <div id="menu-page-body">
                {links()}
            </div>
            <div id='secondary-options' className='column-layout'>
                <div>How it works?</div>
                <div>Contact Us</div>
            </div>
            <div id='menu-page-policy-section' className='column-layout'>
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
                <div>Cookie Policy</div>
            </div>
        </div>
    )
};

MenuPage.propTypes = {
    isLoggedIn: PropTypes.func,
    baseUrl: PropTypes.string.isRequired
};

export default MenuPage;