import PropTypes from 'prop-types';
import React from 'react';
import './LoginPage.scss';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import '../../../styles/Button.scss';
import OAuthButtons from './OAuthButtons';
import '../../../styles/Spacing.scss';
import TitleBar from '../../shared/TitleBar';

const LoginPage = ({ baseUrl }) => (
  <div className="column-layout" id="login-page">
    <TitleBar />
    <h1 className="login-page-title">Login</h1>
    <OAuthButtons baseUrl={baseUrl} />
    <div>OR</div>
    <LoginForm baseUrl={baseUrl} />
    <Link to="forget-password">Forget password</Link>
  </div>
);

LoginPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default LoginPage;
