import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import { updateUserProfileAction } from '../../../redux/user/UserAction';

const AccountInformation = ({ onSaveProfile }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profileName, setProfileName] = useState(user.name);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  return (
    <div>
      <TitleBar />
      <InputWithError
        label="Profile Name"
        onChange={(value) => { setProfileName(value); }}
        value={profileName}
        shouldError={() => {}}
        id="my-account__profile-name"
        type="text"
      />
      <InputWithError
        label="First Name"
        onChange={(value) => { setFirstName(value); }}
        value={firstName}
        shouldError={() => {}}
        id="my-account__first-name"
        type="text"
      />
      <InputWithError
        label="Last Name"
        onChange={(value) => { setLastName(value); }}
        value={lastName}
        shouldError={() => {}}
        id="my-account__last-name"
        type="text"
      />
      <InputWithError
        label="Phone"
        onChange={(value) => { setPhone(value); }}
        value={phone}
        shouldError={() => {}}
        id="my-account__phone"
        type="text"
      />
      <InputWithError
        label="Email"
        onChange={(value) => { setEmail(value); }}
        value={email}
        shouldError={() => {}}
        id="my-account__email"
        type="text"
      />
      <ColoredButton
        buttonText="Save"
        mode="light"
        onClick={() => {
          dispatch(updateUserProfileAction({
            firstName, lastName, phone, email, profileName,
          }));
          onSaveProfile();
        }}
      />
    </div>
  );
};

AccountInformation.propTypes = {
  onSaveProfile: PropTypes.func,
};

AccountInformation.defaultProps = {
  onSaveProfile: () => {},
};
export default AccountInformation;
