const url = 'localhost:3000';

module.exports = {
    'should open location picker modal when click on location picker': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#allow-location-button')
            .click('#location-opener')
            .assert.visible('.home-page-modal')
            .assert.elementNotPresent('#home-page-search-button')
            .end();
    },

    'should go back to homepage when clicking on done': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('#allow-location-button')
            .click('#location-opener')
            .click('#location-picker-done')
            .assert.visible('#home-page-search-button')
            .end();
    }
};