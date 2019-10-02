import GoogleLogin from "react-google-login";
import React, {useState} from "react";
import axios from "axios";

const OAuthButtons = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userImage, setUserImage] = useState('');

    const onGoogleSignIn = (googleUser) => {
        console.log(googleUser);
        const profile = googleUser.getBasicProfile();
        setLoggedInUser(profile.getName());
        setUserImage(profile.getImageUrl());
        const idToken = googleUser.getAuthResponse().id_token;

        axios.post(this.props.baseUrl + '/users/googleSignOn', {
            idToken: idToken
        }, {withCredentials: true}).then(response => {
            console.log('response from googleSignOn: ', response);
        }).catch(error => {
            console.log('error from googleSignOn: ', error);
        })
    };

    const onGoogleSignInFailure = () => {
        console.log("sign in failed");
    };



    return (
        <div className='login-buttons'>
            <GoogleLogin
                clientId={process.env.REACT_APP_googleClientId}
                buttonText="Continue With Google"
                onSuccess={onGoogleSignIn}
                onFailure={onGoogleSignInFailure}
                cookiePolicy={'single_host_origin'}
                render={_ => (
                    <button>Continue with Google</button>
                )}
            />
            {loggedInUser ? loggedInUser : null}
            {loggedInUser ? <img src={userImage} alt="new"/> : null}
        </div>
    )

};

export default OAuthButtons;