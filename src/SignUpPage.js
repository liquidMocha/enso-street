import React from "react";
import axios from 'axios';
import './styles/SignUpPage.scss';
import {Link} from "react-router-dom";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: ""
        };
    }

    onSubmitSignUpForm = (event) => {
        event.preventDefault();
        axios.post(this.props.baseUrl + '/users/createUser', {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        });
    };


    render() {
        return (
            <div className='sign-up-page'>
                <div>Sign Up</div>
                <form onSubmit={this.onSubmitSignUpForm}>
                    <div>
                        <label>
                            Email:
                            <input id='sign-up-email-field'
                                   type='text'
                            onChange={(event) => {this.setState({email: event.target.value})}}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Name:
                            <input id='sign-up-name-field'
                                   type='text'
                                   onChange={(event) => {this.setState({name: event.target.value})}}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input id='sign-up-password-field'
                                   type='password'
                                   onChange={(event) => {this.setState({password: event.target.value})}}/>
                        </label>
                    </div>
                    <Link to='login' id='sign-up-page-login-link'>Login</Link>
                    <button id='sign-up-submit-button' onClick={this.onSubmitSignUpForm}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpPage