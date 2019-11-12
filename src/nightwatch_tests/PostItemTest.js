const url = 'localhost:3000/post-item';

module.exports = {
    'should go to post item page': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .assert.containsText('body', 'Title');
    }
};