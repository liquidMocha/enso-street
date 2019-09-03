import React from "react";

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <div>Sign Up</div>
                <form>
                    <div>
                        <label>
                            Email:
                            <input id='sign-up-email-field'
                                   type='text'/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Name:
                            <input id='sign-up-name-field'
                                   type='text'/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input id='sign-up-password-field'
                                   type='password'/>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpPage