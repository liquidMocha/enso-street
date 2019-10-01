const url = 'localhost:3000';

module.exports = {
    'should display home page': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .assert.visible('#enso-street-title')
            .assert.visible('#login-button')
            .assert.visible('#sign-up-button')
            .end();
    }
};