const url = 'localhost:3000';

module.exports = {
    'should have button for login': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#login-button')
            .assert.visible('#login-email-field')
            .assert.visible('#login-password-field')
            .end();
    }
};