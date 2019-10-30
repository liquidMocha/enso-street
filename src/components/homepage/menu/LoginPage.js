import React from "react";
import '../../../styles/LoginPage.scss';
import LoginForm from "./LoginForm";
import '../../../styles/Button.scss';
import OAuthButtons from "./OAuthButtons";
import '../../../styles/Spacing.scss';
import TitleBar from "../../shared/TitleBar";

const LoginPage = (props) => {
    return (
        <div className='column-layout'>
            <TitleBar/>
            <div className='login-page-title'>Login</div>
            <OAuthButtons baseUrl={props.baseUrl}/>
            <div>OR</div>
            <LoginForm baseUrl={props.baseUrl}/>
            <div>Forget password</div>
        </div>
    );
};

export default LoginPage