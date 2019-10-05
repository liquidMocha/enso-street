const url = 'localhost:3000';

module.exports = {
    'should open date range picker modal when click on date picker': (browser) => {
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