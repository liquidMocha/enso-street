import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import { resetPassword } from '../../../services/UserService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const [password, setPassword] = useState();

  const history = useHistory();
  const query = useQuery();
  const token = query.get('token');

  return (
    <div>
      <TitleBar />
      <section>
        Please enter your new password
        <InputWithError
          id="reset-password-field"
          type="password"
          onChange={(value) => {
            setPassword(value);
          }}
          shouldError={() => !password}
          value={password}
        />
        <ColoredButton
          buttonText="Reset Password"
          mode="dark"
          onClick={async () => {
            await resetPassword(password, token);
            history.push('/login');
          }}
        />
      </section>
    </div>
  );
};

export default ResetPassword;
