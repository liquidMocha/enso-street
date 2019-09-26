import {shallow} from "enzyme";
import React from "react";
import LoginPage from "../LoginPage";
import axios from "axios";

describe('login page', () => {
    it('should send login data to server', () => {
        axios.post = jest.fn(() => Promise.resolve({ data: {} }));
        const loginPage = shallow(<LoginPage/>);

        let emailField = loginPage.find('#login-email-field');
        let enteredEmail = "some-email@enso.com";
        emailField.simulate('change', {target: {value: enteredEmail}});
        let passwordField = loginPage.find('#login-password-field');
        let enteredPassword = 'pa$$';
        passwordField.simulate('change', {target: {value: enteredPassword}});

        loginPage.find('form').simulate('submit', {
            preventDefault: () => {
            }
        });

        expect(axios.post).toHaveBeenCalled();
        expect(axios.post.mock.calls[0][0].includes('/users/login')).toBe(true);
        expect(axios.post.mock.calls[0][1].password).toEqual(enteredPassword);
        expect(axios.post.mock.calls[0][1].email).toEqual(enteredEmail);
    });

    it('should prevent default for login form', () => {
        const loginPage = shallow(<LoginPage/>);

        let preventDefault = false;
        loginPage.find('form').simulate('submit', {
            preventDefault: () => {
                preventDefault = true;
            }
        });

        expect(preventDefault).toBe(true);
    })
});