const url = 'localhost:3000';

module.exports = {
    'should have fields to sign up': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#sign-up-button')
            .assert.visible('#sign-up-email-field')
            .assert.visible('#sign-up-password-field')
            .assert.visible('#sign-up-name-field')
            .end();
    }
};