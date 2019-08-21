import React from 'react';
import './styles/LaunchPage.scss';
import GoogleLogin from "react-google-login";

class LaunchPage extends React.Component {

    onSignInFailure = () => {
        console.log("sign in failed");
    };

    onSignIn = (googleUser) => {
        console.log("onSignIn called from jsx");
        console.log(googleUser);
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    render() {
        return (
            <div className="launch-page">
                <div id="enso-street-title">
                    <p>Enso</p>
                    <p>Street</p>
                </div>
                <GoogleLogin
                    clientId="600326466228-h28741e5k0gksv3440nnn688rnl967bb.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onSignIn}
                    onFailure={this.onSignInFailure}
                    cookiePolicy={'single_host_origin'}
                />
                <div>
                    Conscious Living
                </div>
                <div>
                    Effortless Sharing
                </div>
            </div>
        );
    }
}

export default LaunchPage;