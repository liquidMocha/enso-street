import React from "react";
import GoogleLogin from "react-google-login";
import './styles/LoginPage.scss';
import {Link} from "react-router-dom";
import axios from "axios";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: '',
            userImage: '',
            email: '',
            password: '',
            loginSuccessful: false,
            loginClicked: false
        };
    }

    onLogin = (event) => {
        event.preventDefault();
        this.setState({loginClicked: false});
        axios.post(this.props.baseUrl + '/users/login', {
            email: this.state.email,
            password: this.state.password
        }, {withCredentials: true}).then((response) => {
            this.setState({loginSuccessful: true, loginClicked: true});
        }).catch((error) => {
            this.setState({loginSuccessful: false, loginClicked: true});
        });
    };

    onGoogleSignInFailure = () => {
        console.log("sign in failed");
    };

    onGoogleSignIn = (googleUser) => {
        console.log(googleUser);
        let profile = googleUser.getBasicProfile();
        this.setState({loggedInUser: profile.getName()});
        this.setState({userImage: profile.getImageUrl()});
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    render() {
        return (
            <div className='login-page'>
                <div className='login-page-title'>Log in</div>
                <form onSubmit={this.onLogin}>
                    <div>
                        <label>
                            Email:
                            <input id='login-email-field'
                                   type='text'
                                   onChange={(event) => {
                                       this.setState({email: event.target.value})
                                   }}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input id='login-password-field'
                                   type='password'
                                   onChange={(event) => {
                                       this.setState({password: event.target.value})
                                   }}/>
                        </label>
                    </div>
                    <button onClick={this.onLogin}>Login</button>
                    {!this.state.loginSuccessful && this.state.loginClicked ? 'login failed' : null}
                    {this.state.loginSuccessful && this.state.loginClicked ? 'login successful' : null}
                </form>
                <div className='login-buttons'>
                    <GoogleLogin
                        clientId="600326466228-h28741e5k0gksv3440nnn688rnl967bb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.onGoogleSignIn}
                        onFailure={this.onGoogleSignInFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    {(this.state.loggedInUser ? this.state.loggedInUser : null)}
                    {this.state.loggedInUser ? <img src={this.state.userImage} alt="new"/> : null}
                </div>

                <div className='sign-up-section'>
                    Don't have an account? <Link to='sign-up' className='sign-up-button'>Sign up</Link>
                </div>
            </div>
        );
    }
}

export default LoginPage