import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ColoredButton from '../../shared/ColoredButton';

const OAuthButtons = ({ baseUrl }) => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userImage, setUserImage] = useState('');
  const history = useHistory();

  const onGoogleSignIn = async (googleUser) => {
    console.log(googleUser);
    const profile = googleUser.getBasicProfile();
    setLoggedInUser(profile.getName());
    setUserImage(profile.getImageUrl());
    const idToken = googleUser.getAuthResponse().id_token;

    try {
      await axios.post(`${baseUrl}/users/googleSignOn`, {
        idToken,
      }, { withCredentials: true });

      history.push('/');
    } catch (error) {
      console.log('error from googleSignOn: ', error);
    }
  };

  const onGoogleSignInFailure = () => {
    console.log('sign in failed');
  };

  return (
    <div className="login-buttons">
      <GoogleLogin
        clientId={REACT_APP_googleClientId}
        buttonText="Continue With Google"
        onSuccess={onGoogleSignIn}
        onFailure={onGoogleSignInFailure}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <ColoredButton buttonText="Continue with Google" onClick={renderProps.onClick} disabled={renderProps.disabled} mode="dark" />
        )}
      />
      {loggedInUser || null}
      {loggedInUser ? <img src={userImage} alt="new" /> : null}
    </div>
  );
};

OAuthButtons.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default OAuthButtons;
