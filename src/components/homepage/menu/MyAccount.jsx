import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import { updateUserProfileAction } from '../../../redux/user/UserAction';

const MyAccount = () => {
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
      <label htmlFor="my-account__profile-name">Profile Name</label>
      <InputWithError
        onChange={(value) => { setProfileName(value); }}
        value={profileName}
        shouldError={() => {}}
        id="my-account__profile-name"
        type="text"
      />
      <label htmlFor="my-account__first-name">First Name</label>
      <InputWithError
        onChange={(value) => { setFirstName(value); }}
        value={firstName}
        shouldError={() => {}}
        id="my-account__first-name"
        type="text"
      />
      <label htmlFor="my-account__last-name">Last Name</label>
      <InputWithError
        onChange={(value) => { setLastName(value); }}
        value={lastName}
        shouldError={() => {}}
        id="my-account__last-name"
        type="text"
      />
      <label htmlFor="my-account__phone">Phone</label>
      <InputWithError
        onChange={(value) => { setPhone(value); }}
        value={phone}
        shouldError={() => {}}
        id="my-account__phone"
        type="text"
      />
      <label htmlFor="my-account__email">Email</label>
      <InputWithError
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
          dispatch(updateUserProfileAction(
            {
              firstName, lastName, phone, email, profileName,
            },
          ));
        }}
      />
    </div>
  );
};

export default MyAccount;
