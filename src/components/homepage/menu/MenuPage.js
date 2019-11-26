import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../../../styles/MenuPage.scss';
import TitleBar from "../../shared/TitleBar";
import axios from "axios";

const MenuPage = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        isUserLoggedIn();
    });

    const isUserLoggedIn = async () => {
        await props.isLoggedIn()
            .then((response) => {
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((_) => {
                setIsLoggedIn(false);
            })
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
                <div id='menu-page-button-group'>
                    <Link to={'post-item'} id='post-item-button'>
                        <div className='home-page-button'>
                            Post Item
                        </div>
                    </Link>
                    <Link to={'my-items'} id='post-item-button'>
                        <div className='home-page-button'>
                            My Items
                        </div>
                    </Link>
                    <div id='logout-button' className='home-page-button' onClick={logout}>
                        Log Out
                    </div>
                </div>
            )
        } else {
            return (
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
            )
        }

    };

    return (
        <div className='menu-page'>
            <TitleBar/>
            <div id="menu-page-body">
                {links()}
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