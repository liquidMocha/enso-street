import React from "react";
import './styles/LoginPage.scss';
import LoginForm from "./LoginForm";
import './styles/Button.scss';
import OAuthButtons from "./OAuthButtons";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: '',
            userImage: ''
        };
    }

    render() {
        return (
            <div className='login-page'>
                <div className='login-page-body'>
                    <div className='login-page-title'>Join EnsoStreet</div>
                    <OAuthButtons/>
                    <div>OR</div>
                    <LoginForm baseUrl={this.props.baseUrl}/>
                    <div>Forget password</div>
                </div>
            </div>
        );
    }
}

export default LoginPage