const url = 'http://localhost:3000';

module.exports = {
    'should display login and signup button when not logged in': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .assert.visible('#enso-street-title')
            .assert.visible('#login-button')
            .assert.visible('#sign-up-button')
            .end();
    }
};