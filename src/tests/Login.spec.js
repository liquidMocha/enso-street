const url = 'localhost:3000';

module.exports = {
    'should have button for sign up': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.sign-up-button')
            .assert.visible('#sign-up-email-field')
            .assert.visible('#sign-up-name-field')
            .assert.visible('#sign-up-password-field')
            .assert.elementNotPresent('.login-page-title')
            .end();
    }
};