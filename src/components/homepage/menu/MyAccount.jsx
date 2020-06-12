import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TitleBar from '../../shared/TitleBar';
import './MenuPage.scss';

const MyAccount = ({ contactListPath, addressBookPath }) => (
  <div className="menu-page column-layout">
    <TitleBar />
    <div id="menu-page-body">
      <section>
        <div id="menu-page-button-group">
          <Link to="/account-information" className="menu-page-options">
            Account Information
          </Link>
          <Link to="/bank-account" className="menu-page-options">
            Bank Account
          </Link>
          <Link to={addressBookPath} className="menu-page-options">
            Address Book
          </Link>
          <Link to={contactListPath} className="menu-page-options">
            Contact List
          </Link>
        </div>
      </section>
    </div>
  </div>
);

MyAccount.propTypes = {
  contactListPath: PropTypes.string.isRequired,
  addressBookPath: PropTypes.string.isRequired,
};

export default MyAccount;
