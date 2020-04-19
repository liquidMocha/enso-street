import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputWithError from '../shared/InputWithError';
import ColoredButton from '../shared/ColoredButton';
import { updateUserProfileAction } from '../../redux/user/UserAction';

const MyProfile = ({ onSaveProfile }) => {
  const userProfile = useSelector((state) => state.user);
  const [profileName, setProfileName] = useState(userProfile.name);
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);

  const dispatch = useDispatch();

  return (
    <div>
      <div>Profile Name</div>
      <InputWithError
        type="text"
        onChange={(value) => {
          setProfileName(value);
        }}
        value={profileName}
        id="my-profile-profile-name"
        shouldError={() => false}
      />
      <div>First Name</div>
      <InputWithError
        type="text"
        onChange={(value) => {
          setFirstName(value);
        }}
        value={firstName}
        id="my-profile-first-name"
        shouldError={() => false}
      />
      <div>Last Name</div>
      <InputWithError
        type="text"
        onChange={(value) => {
          setLastName(value);
        }}
        value={lastName}
        id="my-profile-last-name"
        shouldError={() => false}
      />
      <div>Phone</div>
      <InputWithError
        type="text"
        onChange={(value) => {
          setPhone(value);
        }}
        value={phone}
        id="my-profile-phone"
        shouldError={() => false}
      />
      <div>Email</div>
      <InputWithError
        type="text"
        onChange={(value) => {
          setEmail(value);
        }}
        value={email}
        id="my-profile-email"
        shouldError={() => false}
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
          onSaveProfile();
        }}
      />

    </div>
  );
};

MyProfile.propTypes = {
  onSaveProfile: PropTypes.func.isRequired,
};


export default MyProfile;
