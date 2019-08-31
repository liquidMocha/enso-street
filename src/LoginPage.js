import React from "react";
import GoogleLogin from "react-google-login";
import './styles/LoginPage.scss';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loggedInUser: ''};
    }

    onSignInFailure = () => {
        console.log("sign in failed");
    };

    onSignIn = (googleUser) => {
        console.log("onSignIn called from jsx");
        console.log(googleUser);
        let profile = googleUser.getBasicProfile();
        this.setState({loggedInUser: profile.getName()});
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    render() {
        return (
            <div className='login-page'>
                <div className='login-page-title'>Log in</div>
                <div className='login-buttons'>
                    <GoogleLogin
                        clientId="600326466228-h28741e5k0gksv3440nnn688rnl967bb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.onSignIn}
                        onFailure={this.onSignInFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    {(this.state.loggedInUser ? this.state.loggedInUser : null)}
                </div>

                <div className='sign-up-section'>
                    Don't have an account? <span className='sign-up-button'>Sign up</span>
                </div>
            </div>
        );
    }
}

export default LoginPage