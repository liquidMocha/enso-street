import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuPage.scss';
import PropTypes from 'prop-types';
import TitleBar from '../../shared/TitleBar';
import { logout } from '../../../services/UserService';
import ColoredButton from '../../shared/ColoredButton';

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
            <ColoredButton buttonText="Post Items" mode="light" />
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
          <ColoredButton buttonText="Log in" mode="light" />
        </Link>
        <Link to="sign-up" id="sign-up-button">
          <ColoredButton buttonText="Sign Up" mode="light" />
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
  isLoggedIn: PropTypes.func.isRequired,
};

export default MenuPage;