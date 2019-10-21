const url = 'localhost:3000';

module.exports = {
    'should open location picker modal when click on location picker': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#location-opener')
            .assert.containsText('.fixed-title-bar', 'Locations')
            .assert.elementNotPresent('#home-page-search-button')
            .end();
    },

    'should go back to homepage when clicking on done': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#location-opener')
            .click('#location-picker-done')
            .assert.visible('#home-page-search-button')
            .end();
    },

    'should show address page when click plus button': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#location-opener')
            .click('#add-location-button')
            .assert.visible('#zip-code-field')
            .end();
    },

    'should go back to location picker page and display user entered nickname when click apply': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#location-opener')
            .click('#add-location-button')
            .click('#nickname-field')
            .keys('abc')
            .click('#zip-code-field')
            .keys('12345')
            .click('#add-address-apply')
            .assert.containsText('#selectable-search-locations', 'abc')
            .end();
    }
};