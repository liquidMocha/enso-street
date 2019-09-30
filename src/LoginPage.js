import React from "react";
import GoogleLogin from "react-google-login";
import './styles/LoginPage.scss';
import {Link} from "react-router-dom";
import axios from "axios";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: '',
            userImage: ''
        };
    }

    onGoogleSignInFailure = () => {
        console.log("sign in failed");
    };

    onGoogleSignIn = (googleUser) => {
        console.log(googleUser);
        const profile = googleUser.getBasicProfile();
        this.setState({loggedInUser: profile.getName()});
        this.setState({userImage: profile.getImageUrl()});
        const idToken = googleUser.getAuthResponse().id_token;

        axios.post(this.props.baseUrl + '/users/googleSignOn', {
            idToken: idToken
        }, {withCredentials: true}).then(response => {
            console.log('response from googleSignOn: ', response);
        }).catch(error => {
            console.log('error from googleSignOn: ', error);
        })
    };

    render() {
        return (
            <div className='login-page'>
                <div className='login-page-title'>Log in</div>
                <LoginForm baseUrl={this.props.baseUrl}/>
                <div className='login-buttons'>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_googleClientId}
                        buttonText="Continue With Google"
                        onSuccess={this.onGoogleSignIn}
                        onFailure={this.onGoogleSignInFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    {this.state.loggedInUser ? this.state.loggedInUser : null}
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