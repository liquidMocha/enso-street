module.exports = {
    'should have Post Item title and item title field': (browser) => {
        const homepage = browser.page.HomePageObject();
        const loginPage = browser.page.LoginPageObject();
        const postItemPage = browser.page.PostItemPageObject();

        homepage.navigate().click('@menuButton');
        loginPage.click('@postItemButton');

        browser.assert.containsText('body', 'Post Items');
        browser.assert.containsText('body', 'Title');
        postItemPage.setValue('@itemTitleInputField', 'some item');
    }
};