const url = 'localhost:3000/post-item';

module.exports = {
    'should go to post item page': (browser) => {
        const postItemPageObject = browser.page.PostItemPageObject();

        browser.url(url)
            .waitForElementVisible('body')
            .assert.containsText('body', 'Title');

        postItemPageObject
            .setValue('@itemTitleInputField', 'baby drill')
            .click('@next-button')
            .assert.containsText('@item-title-row', 'baby drill');
    }
};