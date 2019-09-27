import React, {useState} from "react";
import axios from "axios";

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
        <form onSubmit={onLogin}>
            <div>
                <label>
                    Email:
                    <input id='login-email-field'
                           type='text'
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }}/>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input id='login-password-field'
                           type='password'
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}/>
                </label>
            </div>
            <button onClick={onLogin}>Login</button>
            {!loginSuccessful && loginClicked ? 'login failed' : null}
            {loginSuccessful && loginClicked ? 'login successful' : null}
        </form>
    )
};

export default LoginForm;