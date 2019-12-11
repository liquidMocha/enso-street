const url = 'http://localhost:3000';

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

    'should display default dates on homepage': (browser) => {
        const dateFormatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'});

        browser.url(url)
            .waitForElementVisible('body')
            .assert.containsText('#date-range-opener', `${dateFormatter.format(new Date())} - ${dateFormatter.format(new Date())}`)
    },

    'should display user selected location on homepage': (browser) => {
        const homepage = browser.page.HomePageObject();
        const locationPickerPage = browser.page.LocationPickerPageObject();

        homepage.navigate()
            .click('@locationPageOpener');

        locationPickerPage
            .click('@addLocationButton')
            .setValue('@nicknameField', 'abc')
            .setValue('@zipCodeField', '12345')
            .click('@applyLocationButton')
            .click('@locationPickerDone');

        homepage.assert.containsText('@locationPageOpener', 'abc');

        browser.end();
    }

};