import PropTypes from 'prop-types';
import React from 'react';
import './LoginPage.scss';
import LoginForm from './LoginForm';
import '../../../styles/Button.scss';
import OAuthButtons from './OAuthButtons';
import '../../../styles/Spacing.scss';
import TitleBar from '../../shared/TitleBar';

const LoginPage = ({ baseUrl }) => (
  <div className="column-layout">
    <TitleBar />
    <div className="login-page-title">Login</div>
    <OAuthButtons baseUrl={baseUrl} />
    <div>OR</div>
    <LoginForm baseUrl={baseUrl} />
    <div>Forget password</div>
  </div>
);

LoginPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default LoginPage;
