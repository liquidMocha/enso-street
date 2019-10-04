const url = 'localhost:3000';

module.exports = {
    'should have menu button to go to menu page': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .assert.visible('#sign-up-button')
            .assert.visible('#login-button')
            .end();
    },

    'should go back to home page when click on EnsoStreet': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .click('#enso-street-title')
            .expect.url().to.endWith(url + '/')
    },

    'should open date picker modal when click on date picker': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#date-range-opener')
            .assert.visible('.date-range-picker-modal')
            .assert.elementNotPresent('#home-page-search-button')
            .end();
    },

    'should close date picker modal when click done': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .click('#date-range-opener')
            .click('#date-range-picker-close')
            .assert.elementNotPresent('.date-range-picker-modal')
            .assert.visible('#home-page-search-button')
            .end();
    },

    'should display date tabs': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .click('#date-range-opener')
            .assert.visible('#date-tabs')
            .end();
    }
};