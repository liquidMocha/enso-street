import React from "react";
import './styles/LoginPage.scss';
import LoginForm from "./LoginForm";
import './styles/Button.scss';
import OAuthButtons from "./OAuthButtons";
import './styles/Spacing.scss';

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
            <div className='column-layout'>
                <div className='login-page-title'>Login</div>
                <OAuthButtons baseUrl={this.props.baseUrl}/>
                <div>OR</div>
                <LoginForm baseUrl={this.props.baseUrl}/>
                <div>Forget password</div>
            </div>
        );
    }
}

export default LoginPage