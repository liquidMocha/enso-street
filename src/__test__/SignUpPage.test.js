import React from 'react';
import {shallow} from 'enzyme';
import SignUpPage from "../SignUpPage";
import axios from "axios";

describe('sign up page', () => {
    const testBaseUrl = 'www.baseUrl';
    let signUpPage;

    beforeEach(() => {
        signUpPage = shallow(<SignUpPage baseUrl={testBaseUrl}/>);
        axios.post = jest.fn();
    });

    it('should send sign up data to server', () => {
        const enteredEmail = 'email@enso.com';
        enterIntoField('#sign-up-email-field', enteredEmail);
        const enteredName = 'Dwight Schrute';
        enterIntoField('#sign-up-name-field', enteredName);
        const enteredPassword = '$heep7Lucky';
        enterIntoField('#sign-up-password-field', enteredPassword);

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

    it('should not send form data if password is less than 8 characters', () => {
        const enteredEmail = 'email@enso.com';
        enterIntoField('#sign-up-email-field', enteredEmail);
        const enteredName = 'Dwight Schrute';
        enterIntoField('#sign-up-name-field', enteredName);
        const enteredPassword = '1234567';
        enterIntoField('#sign-up-password-field', enteredPassword);

        signUpPage.find('#sign-up-submit-button').simulate("click", {
            preventDefault: () => {
            }
        });

        expect(axios.post).not.toHaveBeenCalled();
    });

    it('should prevent default for sign up form', () => {
        let preventDefault = false;
        signUpPage.find('form').simulate('submit', {
            preventDefault: () => {
                preventDefault = true;
            }
        });

        expect(preventDefault).toBe(true);
    });

    const enterIntoField = (selector, enteredEmail) => {
        let emailField = signUpPage.find(selector);
        emailField.simulate("change", {target: {value: enteredEmail}});
        return enteredEmail;
    };
});
