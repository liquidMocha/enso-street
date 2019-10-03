const url = 'localhost:3000/menu';
const signUpUrl = 'localhost:3000/sign-up';

module.exports = {
    'should have fields to sign up': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#sign-up-button')
            .assert.visible('#sign-up-email-field')
            .assert.visible('#sign-up-password-field')
            .assert.visible('#sign-up-name-field')
            .expect.url().to.contain('/sign-up')
    },

    'should display error when fields are left empty': (browser) => {
        browser
            .url(signUpUrl)
            .click('#sign-up-email-field')
            .click('#sign-up-password-field')
            .click('#sign-up-name-field')
            .keys(browser.Keys.TAB)
            .expect.elements('.field-is-required').count.to.equal(3);
    },

    'should hide error again when fields are filled': (browser) => {
        browser
            .url(signUpUrl)
            .click('#sign-up-email-field')
            .click('#sign-up-password-field')
            .click('#sign-up-name-field')
            .click('#sign-up-email-field')
            .keys('abc')
            .click('#sign-up-password-field')
            .keys('abc')
            .click('#sign-up-name-field')
            .keys('abc')
            .keys(browser.Keys.TAB)
            .expect.elements('.field-is-required').count.to.equal(0);
    }
};