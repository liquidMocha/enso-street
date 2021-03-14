import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { assoc } from 'ramda';
import TitleBar from '../../shared/TitleBar';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import { updateUserProfileAction } from '../../../redux/user/UserAction';
import { getUserProfile } from '../../../services/UserProfileService';

const AccountInformation = ({ onSaveProfile }) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserProfile().then(setUserProfile);
  }, []);

  return (
    <div>
      <TitleBar />
      <InputWithError
        label="Profile Name"
        onChange={(value) => { setUserProfile(assoc('name', value, userProfile)); }}
        value={userProfile.name}
        shouldError={() => {}}
        id="my-account__profile-name"
        type="text"
      />
      <InputWithError
        label="First Name"
        onChange={(value) => { setUserProfile(assoc('firstName', value, userProfile)); }}
        value={userProfile.firstName}
        shouldError={() => {}}
        id="my-account__first-name"
        type="text"
      />
      <InputWithError
        label="Last Name"
        onChange={(value) => { setUserProfile(assoc('lastName', value, userProfile)); }}
        value={userProfile.lastName}
        shouldError={() => {}}
        id="my-account__last-name"
        type="text"
      />
      <InputWithError
        label="Phone"
        onChange={(value) => { setUserProfile(assoc('phone', value, userProfile)); }}
        value={userProfile.phone}
        shouldError={() => {}}
        id="my-account__phone"
        type="text"
      />
      <InputWithError
        label="Email"
        onChange={(value) => { setUserProfile(assoc('email', value, userProfile)); }}
        value={userProfile.email}
        shouldError={() => {}}
        id="my-account__email"
        type="text"
      />
      <ColoredButton
        buttonText="Save"
        mode="light"
        onClick={() => {
          dispatch(updateUserProfileAction({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            phone: userProfile.phone,
            email: userProfile.email,
            profileName: userProfile.name,
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
