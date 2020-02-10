import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import LoginForm from '../components/homepage/menu/LoginForm';

describe('login page', () => {
  it('should send login data to server', () => {
    axios.post = jest.fn(() => Promise.resolve({ data: {} }));
    const loginPage = shallow(<LoginForm baseUrl="" />);

    const emailField = loginPage.find('#login-email-field');
    const enteredEmail = 'some-email@enso.com';
    emailField.simulate('change', enteredEmail);
    const passwordField = loginPage.find('#login-password-field');
    const enteredPassword = 'pa$$';
    passwordField.simulate('change', enteredPassword);

    loginPage.find('form').simulate('submit', {
      preventDefault: () => {
      },
    });

    expect(axios.post).toHaveBeenCalled();
    expect(axios.post.mock.calls[0][0].includes('/users/login')).toBe(true);
    expect(axios.post.mock.calls[0][1].password).toEqual(enteredPassword);
    expect(axios.post.mock.calls[0][1].email).toEqual(enteredEmail);
  });

  it('should prevent default for login form', () => {
    const loginPage = shallow(<LoginForm baseUrl="" />);

    let preventDefault = false;
    loginPage.find('form').simulate('submit', {
      preventDefault: () => {
        preventDefault = true;
      },
    });

    expect(preventDefault).toBe(true);
  });
});
