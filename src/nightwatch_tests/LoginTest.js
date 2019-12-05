const url = 'https://localhost:3000';

module.exports = {
    'should have button for login': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .click('#login-button')
            .assert.visible('#login-email-field')
            .assert.visible('#login-password-field')
            .expect.url().to.contain('/login');
    },

    'should not display error message initially': (browser) => {
        browser
            .url(url)
            .click('.menu-button-container')
            .click('#login-button')
            .click('#login-email-field')
            .expect.elements('.field-is-required').count.to.equal(0)
    },

    'should display error message when left email field empty': (browser) => {
        browser
            .url(url)
            .click('.menu-button-container')
            .click('#login-button')
            .click('#login-email-field')
            .click('#login-password-field')
            .expect.elements('.field-is-required').count.to.equal(1)
    },

    'should display error message when left password field empty': (browser) => {
        browser
            .url(url)
            .click('.menu-button-container')
            .click('#login-button')
            .click('#login-password-field')
            .click('#login-email-field')
            .expect.elements('.field-is-required').count.to.equal(1)
    },

    'should hide error again after filling in the fields': (browser) => {
        browser
            .url(url)
            .click('.menu-button-container')
            .click('#login-button')
            .click('#login-password-field')
            .click('#login-email-field')
            .keys('abc')
            .click('#login-password-field')
            .keys('abc')
            .keys(browser.Keys.TAB)
            .expect.elements('.field-is-required').count.to.equal(0)

    }
};