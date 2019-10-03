const url = 'localhost:3000/menu';

module.exports = {
    'should display home page': (browser) => {
        browser
            .url(url)
            .waitForElementVisible('body')
            .assert.visible('.enso-street-title-bar')
            .assert.visible('#login-button')
            .assert.visible('#sign-up-button')
            .end();
    }
};