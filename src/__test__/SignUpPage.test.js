import React from 'react';
import {shallow} from 'enzyme';
import SignUpPage from "../SignUpPage";
import axios from "axios";

describe('sign up page', () => {
    it('should send sign up data to server', () => {
        axios.post = jest.fn();
        const testBaseUrl = 'www.baseUrl';
        const signUpPage = shallow(<SignUpPage baseUrl={testBaseUrl}/>);

        let emailField = signUpPage.find('#sign-up-email-field');
        let enteredEmail = 'email@enso.com';
        emailField.simulate("change", {target: {value: enteredEmail}});
        let nameField = signUpPage.find('#sign-up-name-field');
        let enteredName = 'Dwight Schrute';
        nameField.simulate("change", {target: {value: enteredName}});
        let passwordField = signUpPage.find('#sign-up-password-field');
        let enteredPassword = '$heep7Lucky';
        passwordField.simulate("change", {target: {value: enteredPassword}});

        signUpPage.find('#sign-up-submit-button').simulate("click", {
            preventDefault: () => {
            }
        });

        expect(axios.post).toHaveBeenCalled();
        expect(axios.post.mock.calls[0][0].includes(testBaseUrl + '/users/createUser')).toBe(true);
        expect(axios.post.mock.calls[0][1].email).toEqual(enteredEmail);
        expect(axios.post.mock.calls[0][1].name).toEqual(enteredName);
        expect(axios.post.mock.calls[0][1].password).toEqual(enteredPassword);
    });

    it('should prevent default for sign up form', () => {
        const signupPage = shallow(<SignUpPage/>);

        let preventDefault = false;
        signupPage.find('form').simulate('submit', {
            preventDefault: () => {
                preventDefault = true;
            }
        });

        expect(preventDefault).toBe(true);
    })
});
