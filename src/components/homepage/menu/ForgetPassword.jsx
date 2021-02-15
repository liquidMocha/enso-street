import React, { useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import { forgetPassword } from '../../../services/UserService';

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [resetClicked, setResetClicked] = useState(false);

  return (
    <div>
      <TitleBar />
      <InputWithError
        label="Email"
        id="forget-password-email-field"
        onChange={setEmail}
        shouldError={() => !email}
        type="text"
        value={email}
      />
      <ColoredButton
        onClick={() => {
          setResetClicked(true);
          forgetPassword(email);
        }}
        buttonText="Forget Password"
        mode="dark"
      />
      {resetClicked ? <section>Please check your email to reset your password</section> : null}
    </div>
  );
};

export default ForgetPassword;
