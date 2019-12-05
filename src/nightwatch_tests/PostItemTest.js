const url = 'https://localhost:3000/post-item';

module.exports = {
    'should go to post item page': (browser) => {
        browser.url(url)
            .waitForElementVisible('body')
            .assert.containsText('body', 'Title');
    },

    'should go to photo selection page when click use my photo button': (browser) => {
        const postItemPage = browser.page.PostItemPageObject();

        browser.url(url).waitForElementVisible('body');

        postItemPage
            .click('@useMyPhotoButton')
            .expect.url().to.endWith('use-my-photo')
    }
};