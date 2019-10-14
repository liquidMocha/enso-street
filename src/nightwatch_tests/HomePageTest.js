const url = 'localhost:3000';

module.exports = {
    'should have menu button to go to menu page': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#allow-location-button')
            .click('.menu-button-container')
            .assert.visible('#sign-up-button')
            .assert.visible('#login-button')
            .end();
    },

    'should go back to home page when click on EnsoStreet': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#allow-location-button')
            .click('.menu-button-container')
            .click('#enso-street-title')
            .expect.url().to.endWith(url + '/')
    },

    'should display default dates on homepage': (browser) => {
        const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

        browser.url(url)
            .waitForElementVisible('body')
            .assert.containsText('#date-range-opener', `${dateFormatter.format(new Date())} - ${dateFormatter.format(new Date())}`)
    },

    'should display location permission modal initially': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .assert.visible('#location-permission-modal')
    },

    'should go to location selection if clicked Do not allow': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .click('#do-not-allow-location-button')
            .assert.containsText('#date-range-picker-title-bar', 'Locations')
    }
};