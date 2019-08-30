module.exports = {
    'Home Page test': function (browser) {
        browser
            .url('localhost:3000')
            .waitForElementVisible('body')
            .click('.menu-button-container')
            .assert.visible('.menu-container')
            .end();
    }
};