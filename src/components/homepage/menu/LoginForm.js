import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import InputWithError from '../../shared/InputWithError';

const LoginForm = (props) => {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (event) => {
    event.preventDefault();
    setLoginClicked(false);
    axios.post(`${props.baseUrl}/users/login`, {
      email,
      password,
    }, { withCredentials: true })
      .then(() => {
        setLoginClicked(true);
        setLoginSuccessful(true);
      }).catch(() => {
        setLoginClicked(true);
        setLoginSuccessful(false);
      });
  };

  return (
    <form id="login-form" onSubmit={onLogin}>
      <div>
        <label className="input-label">Email</label>
        <InputWithError
          id="login-email-field"
          type="text"
          onChange={(value) => {
            setEmail(value);
          }}
          shouldError={() => email === ''}
          value={email}
        />
      </div>
      <div>
        <label className="input-label">Password</label>
        <InputWithError
          id="login-password-field"
          type="password"
          onChange={(value) => {
            setPassword(value);
          }}
          shouldError={() => password === ''}
          value={password}
        />
      </div>
      <button id="login-button" type="button" onClick={onLogin}>Log In</button>
      {!loginSuccessful && loginClicked ? 'login failed' : null}
      {loginSuccessful && loginClicked ? 'login successful' : null}
    </form>
  );
};

LoginForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default LoginForm;
