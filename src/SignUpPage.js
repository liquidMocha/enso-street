import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styles/SignUpPage.scss';
import * as ReactGA from "react-ga";
import OAuthButtons from "./OAuthButtons";
import './styles/Input.scss';

function SignUpPage(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [signUpFailed, setSignUpFailed] = useState(false);

    useEffect(() => ReactGA.pageview('/sign-up'));

    const onSubmitSignUpForm = (event) => {
        event.preventDefault();
        if (password.length < 8) {
            setSignUpFailed(true);
            return;
        }
        axios.post(props.baseUrl + '/users/createUser', {
            email: email,
            name: name,
            password: password
        });
    };


    return (
        <div className='sign-up-page'>
            <div>Join EnsoStreet</div>
            <OAuthButtons baseUrl={props.baseUrl}/>
            <div>OR</div>
            <form onSubmit={onSubmitSignUpForm}>
                <div>
                    <label>
                        Email
                        <input id='sign-up-email-field'
                               type='text'
                               onChange={(event) => {setEmail(event.target.value)}}/>
                    </label>
                </div>
                <div>
                    <label>
                        Name
                        <input id='sign-up-name-field'
                               type='text'
                               onChange={(event) => {setName(event.target.value)}}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input id='sign-up-password-field'
                               type='password'
                               onChange={(event) => {setPassword(event.target.value)}}/>
                    </label>
                </div>
                <button id='sign-up-submit-button' onClick={onSubmitSignUpForm}>Sign Up</button>
            </form>
            {signUpFailed ? 'sign up failed' : null}
            <div id='agree-terms-claim'>
                By signing up or logging in, you agree to the Ensostreet Terms of Service and Privacy Policy.
            </div>
        </div>
    );
}

export default SignUpPage