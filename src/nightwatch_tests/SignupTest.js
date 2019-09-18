const url = 'localhost:3000';

module.exports = {
    'should have login link': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .click('#menu-signup-option')
            .assert.visible('#sign-up-page-login-link')
            .end();
    }
};