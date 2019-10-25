import React, {useState} from "react";
import axios from "axios";
import InputWithError from "../../shared/InputWithError";

const LoginForm = (props) => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <form id='login-form' onSubmit={onLogin}>
            <div>
                <label className='input-label'>Email</label>
                <InputWithError id='login-email-field'
                                type='text'
                                onChange={(value) => {
                                    setEmail(value)
                                }}
                                shouldError={() => email === ''}
                />
            </div>
            <div>
                <label className='input-label'>Password</label>
                <InputWithError id='login-password-field'
                                type='password'
                                onChange={(value) => {
                                    setPassword(value)
                                }}
                                shouldError={() => password === ''}
                />
            </div>
            <button onClick={onLogin}>Log In</button>
            {!loginSuccessful && loginClicked ? 'login failed' : null}
            {loginSuccessful && loginClicked ? 'login successful' : null}
        </form>
    )
};

export default LoginForm;