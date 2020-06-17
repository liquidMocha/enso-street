import React, { useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ButtonWithSpinner from '../../shared/ButtonWithSpinner';
import './ChangePassword.scss';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatNewPassword, setRepeatNewPassword] = useState();

  return (
    <div className="change-password-page">
      <TitleBar />
      <label>Current Password</label>
      <InputWithError
        type="password"
        value={currentPassword}
        onChange={((value) => { setCurrentPassword(value); })}
        id="change-password__current-password"
        shouldError={() => {}}
      />
      <label>New Password</label>
      <InputWithError
        type="password"
        value={newPassword}
        onChange={(value) => { setNewPassword(value); }}
        id="change-password__new-password"
        shouldError={() => newPassword.length < 8}
      />
      <label>Confirm new password</label>
      <InputWithError
        type="password"
        value={repeatNewPassword}
        onChange={(value) => { setRepeatNewPassword(value); }}
        id="repeat-password"
        shouldError={() => newPassword !== repeatNewPassword}
      />
      <ButtonWithSpinner
        text="Update Password"
        onClickingPost={() => {}}
        displaySpinner={false}
      />
    </div>
  );
};

export default ChangePassword;
