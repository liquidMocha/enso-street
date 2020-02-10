import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuPage.scss';
import PropTypes from 'prop-types';
import TitleBar from '../../shared/TitleBar';
import { logout } from '../../../services/UserService';

const MenuPage = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isUserLoggedIn = async () => {
    setIsLoggedIn(await props.isLoggedIn());
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const onClickLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
      });
  };

  const links = () => {
    if (isLoggedIn) {
      return (
        <section>
          <Link to="post-item" id="post-item-button">
            <button type="button">
              Post Items
            </button>
          </Link>
          <div id="menu-page-button-group">
            <Link to="my-items" id="post-item-button">
              <div className="menu-page-options">
                My Items
              </div>
            </Link>
            <div id="logout-button" className="menu-page-options" onClick={onClickLogout}>
              Log Out
            </div>
          </div>
        </section>
      );
    }
    return (
      <div id="menu-page-button-group">
        <Link to="login" id="login-button">
          <button type="button">
            Log in
          </button>
        </Link>
        <Link to="sign-up" id="sign-up-button">
          <button type="button">
            Sign up
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="menu-page column-layout">
      <TitleBar />
      <div id="menu-page-body">
        {links()}
      </div>
      <div id="secondary-options" className="column-layout">
        <div>How it works?</div>
        <div>Contact Us</div>
      </div>
      <div id="menu-page-policy-section" className="column-layout">
        <div>Privacy Policy</div>
        <div>Terms & Conditions</div>
        <div>Cookie Policy</div>
      </div>
    </div>
  );
};

MenuPage.propTypes = {
  isLoggedIn: PropTypes.func.isRequired
};

export default MenuPage;
