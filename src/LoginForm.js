import React, {useState} from "react";
import axios from "axios";
import './styles/LoginForm.scss';
import ErrorMessage from "./ErrorMessage";

const LoginForm = (props) => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showEmailFieldRequired, setShowEmailFieldRequired] = useState(false);
    const [showPasswordFieldRequired, setShowPasswordFieldRequired] = useState(false);

    const onLogin = (event) => {
        event.preventDefault();
        setLoginClicked(false);
        axios.post(props.baseUrl + '/users/login', {
            email: email,
            password: password
        }, {withCredentials: true})
            .then((response) => {
                setLoginClicked(true);
                setLoginSuccessful(true);
            }).catch((error) => {
            setLoginClicked(true);
            setLoginSuccessful(false);
        });
    };

    const flipOnEmpty = (stateToCheck, effect) => {
        if (stateToCheck === '') {
            effect(true);
        } else {
            effect(false);
        }
    };

    return (
        <form id='login-form' onSubmit={onLogin}>
            <div>
                <label>
                    Email
                </label>
                <input id='login-email-field'
                       type='text'
                       data-lpignore='true'
                       onChange={(event) => {
                           setEmail(event.target.value)
                       }}
                       onBlur={flipOnEmpty.bind(this, email, setShowEmailFieldRequired)}
                />
                {showEmailFieldRequired ? <ErrorMessage message='This field is required'/> : null}
            </div>
            <div>
                <label>
                    Password
                </label>
                <input id='login-password-field'
                       type='password'
                       data-lpignore='true'
                       onChange={(event) => {
                           setPassword(event.target.value)
                       }}
                       onBlur={flipOnEmpty.bind(this, password, setShowPasswordFieldRequired)}
                />
                {showPasswordFieldRequired ? <ErrorMessage message='This field is required'/> : null}
            </div>
            <button onClick={onLogin}>Login</button>
            {!loginSuccessful && loginClicked ? 'login failed' : null}
            {loginSuccessful && loginClicked ? 'login successful' : null}
        </form>
    )
};

export default LoginForm;