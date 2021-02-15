import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUpPage.scss';
import * as ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import OAuthButtons from './OAuthButtons';
import '../../../styles/Input.scss';
import InputWithError from '../../shared/InputWithError';
import TitleBar from '../../shared/TitleBar';
import DisableableButton from '../../shared/DisableableButton';

function SignUpPage({ baseUrl }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const history = useHistory();

  useEffect(() => ReactGA.pageview('/sign-up'));

  const onSubmitSignUpForm = async () => {
    if (password.length < 8) {
      setSignUpFailed(true);
      return;
    }

    try {
      await axios.post(`${baseUrl}/users/createUser`, {
        email,
        name,
        password,
      });
      setSignUpFailed(false);
      history.push('/login');
    } catch (e) {
      setSignUpFailed(true);
    }
  };

  return (
    <div className="sign-up-page">
      <TitleBar />
      <h1>Join EnsoStreet</h1>
      <OAuthButtons baseUrl={baseUrl} />
      <div>OR</div>
      <form>
        <InputWithError
          label="Email"
          id="sign-up-email-field"
          type="text"
          onChange={(value) => {
            setEmail(value);
          }}
          shouldError={() => email === ''}
          value={email}
        />
        <InputWithError
          label="Name"
          id="sign-up-name-field"
          type="text"
          onChange={(value) => {
            setName(value);
          }}
          shouldError={() => name === ''}
          value={name}
        />
        <InputWithError
          label="Password"
          id="sign-up-password-field"
          type="password"
          onChange={(value) => {
            setPassword(value);
          }}
          shouldError={() => password === ''}
          value={password}
        />
        <DisableableButton
          id="sign-up-submit-button"
          buttonText="Sign Up"
          onClick={onSubmitSignUpForm}
        />
        {signUpFailed ? 'sign up failed' : null}
        <label id="agree-terms-claim" htmlFor="sign-up-agree-terms">
          <InputWithError
            id="sign-up-agree-terms"
            type="checkbox"
            onChange={() => { setAgreeToTerms(!agreeToTerms); }}
            value={agreeToTerms}
            shouldError={() => !agreeToTerms}
          />
          <span>
            By signing up or logging in, you agree to the Enso Street
            <Link to="/terms-and-conditions"> Terms of Service </Link>
            and
            <Link to="/privacy-policy"> Privacy Policy</Link>
            .
          </span>
        </label>
      </form>
    </div>
  );
}

SignUpPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default SignUpPage;
