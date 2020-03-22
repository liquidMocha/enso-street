import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import InputWithError from '../../shared/InputWithError';
import DisableableButton from '../../shared/DisableableButton';

const LoginForm = (props) => {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const onLogin = async () => {
    setLoginClicked(false);

    try {
      await axios.post(`${props.baseUrl}/users/login`, {
        email,
        password,
      }, { withCredentials: true });

      history.push('/');
    } catch (e) {
      setLoginClicked(true);
      setLoginSuccessful(false);
    }
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
      <DisableableButton onClick={onLogin} id="login-button" buttonText="Log In" />
      {!loginSuccessful && loginClicked ? 'login failed' : null}
    </form>
  );
};

LoginForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default LoginForm;
