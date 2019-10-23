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
    },

    'should highlight the location if it is the only one': (browser) => {
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
            .assert.cssClassPresent('div[data-test="location-row"]', 'highlight-background');
    },

    'should highlight the location selected': (browser) => {
        const homepage = browser.page.HomePageObject();
        homepage.navigate()
            .waitForElementVisible('body')
            .click('#location-opener')
            .click('#add-location-button')
            .setValue('@nicknameField', 'abc')
            .setValue('@zipCodeField', '12345')
            .click('#add-address-apply')
            .click('#add-location-button')
            .setValue('@nicknameField', 'home')
            .setValue('@zipCodeField', '54321')
            .click('#add-address-apply')
            .click({selector: '@locationRow', index: 1})
            .assert.cssClassPresent({selector: '@locationRow', index: 1}, 'highlight-background');;

        browser.end();
    }
};