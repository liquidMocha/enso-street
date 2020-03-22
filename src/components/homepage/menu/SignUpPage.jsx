import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUpPage.scss';
import * as ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import OAuthButtons from './OAuthButtons';
import '../../../styles/Input.scss';
import InputWithError from '../../shared/InputWithError';
import TitleBar from '../../shared/TitleBar';
import DisableableButton from '../../shared/DisableableButton';

function SignUpPage({ baseUrl }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
      <div>Join EnsoStreet</div>
      <OAuthButtons baseUrl={baseUrl} />
      <div>OR</div>
      <form>
        <div>
          <label>
            Email
          </label>
          <InputWithError
            id="sign-up-email-field"
            type="text"
            onChange={(value) => {
              setEmail(value);
            }}
            shouldError={() => email === ''}
            value={email}
          />
        </div>
        <div>
          <label>
            Name
          </label>
          <InputWithError
            id="sign-up-name-field"
            type="text"
            onChange={(value) => {
              setName(value);
            }}
            shouldError={() => name === ''}
            value={name}
          />
        </div>
        <div>
          <label>
            Password
          </label>
          <InputWithError
            id="sign-up-password-field"
            type="password"
            onChange={(value) => {
              setPassword(value);
            }}
            shouldError={() => password === ''}
            value={password}
          />
        </div>
        <DisableableButton
          id="sign-up-submit-button"
          buttonText="Sign Up"
          onClick={onSubmitSignUpForm}
        />
      </form>
      {signUpFailed ? 'sign up failed' : null}
      <div id="agree-terms-claim">
        By signing up or logging in, you agree to the Enso Street Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
}

SignUpPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default SignUpPage;
