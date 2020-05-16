import React, { useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';

const ForgetPassword = () => {
  const [email, setEmail] = useState();

  return (
    <div>
      <TitleBar />
      <label htmlFor="forget-password-email-field">Email: </label>
      <InputWithError
        id="forget-password-email-field"
        onChange={setEmail}
        shouldError={() => email}
        type="text"
        value={email}
      />
      <ColoredButton buttonText="Reset Password" mode="dark" />
    </div>
  );
};

export default ForgetPassword;
