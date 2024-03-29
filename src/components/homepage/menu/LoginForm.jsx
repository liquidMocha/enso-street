import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputWithError from '../../shared/InputWithError';
import DisableableButton from '../../shared/DisableableButton';
import InitializeUser from '../../../InitializeUser';

const LoginForm = (props) => {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const history = useHistory();
  const onLogin = async () => {
    setLoginClicked(false);

    try {
      await axios.post(`${props.baseUrl}/users/login`, {
        email,
        password,
      }, { withCredentials: true });

      InitializeUser(dispatch);
      history.push('/');
    } catch (e) {
      setLoginClicked(true);
      setLoginSuccessful(false);
    }
  };

  return (
    <form id="login-form" onSubmit={onLogin}>
      <InputWithError
        label="Email"
        id="login-email-field"
        type="text"
        onChange={(value) => {
          setEmail(value);
        }}
        shouldError={() => email === ''}
        value={email}
        onEnter={onLogin}
      />
      <InputWithError
        label="Password"
        id="login-password-field"
        type="password"
        onChange={(value) => {
          setPassword(value);
        }}
        shouldError={() => password === ''}
        value={password}
        onEnter={onLogin}
      />
      <DisableableButton onClick={onLogin} id="login-button" buttonText="Log In" />
      {!loginSuccessful && loginClicked ? 'login failed' : null}
    </form>
  );
};

LoginForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default LoginForm;
