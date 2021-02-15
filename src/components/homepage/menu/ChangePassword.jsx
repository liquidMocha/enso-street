import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ButtonWithSpinner from '../../shared/ButtonWithSpinner';
import './ChangePassword.scss';
import { updatePasswordAction } from '../../../redux/user/UserAction';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatNewPassword, setRepeatNewPassword] = useState();
  const updatingPassword = useSelector((state) => state.user.updatingPassword);
  const updatePasswordError = useSelector((state) => state.user.updatePasswordError);

  const dispatch = useDispatch();

  return (
    <div className="change-password-page">
      <TitleBar />
      <InputWithError
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={((value) => { setCurrentPassword(value); })}
        id="change-password__current-password"
        shouldError={() => {}}
      />
      <InputWithError
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(value) => { setNewPassword(value); }}
        id="change-password__new-password"
        shouldError={() => newPassword.length < 8}
      />
      <InputWithError
        label="Confirm new password"
        type="password"
        value={repeatNewPassword}
        onChange={(value) => { setRepeatNewPassword(value); }}
        id="repeat-password"
        shouldError={() => newPassword !== repeatNewPassword}
      />
      <ButtonWithSpinner
        text="Update Password"
        onClickingPost={() => {
          dispatch(updatePasswordAction(currentPassword, newPassword));
        }}
        displaySpinner={updatingPassword}
      />
      {updatePasswordError ? <p>Failed to update password.</p> : null}
    </div>
  );
};

export default ChangePassword;
