const url = 'localhost:3000';

module.exports = {
    'Menu button should show and hide menu': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .assert.visible('.menu-container')
            .click('.menu-button-container')
            .assert.elementNotPresent('.menu-container')
            .end();
    }
};