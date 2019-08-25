const assert = require("assert").strict;
const webdriver = require("selenium-webdriver");
require("geckodriver");// Application Server
const serverUri = "http://localhost:3000/#";
const appTitle = "Enso Street";

const browser = new webdriver.Builder()
    .usingServer()
    .withCapabilities({browserName: "chrome"})
    .build();

function logTitle() {
    return new Promise((resolve, reject) => {
        browser.getTitle()
            .then(function (title) {
                resolve(title);
            });
    });
}

describe("Home Page", function () {
    it("Should load the home page and get title", function () {
        return new Promise((resolve, reject) => {
            browser
                .get(serverUri)
                .then(logTitle)
                .then(title => {
                    assert.strictEqual(title, appTitle);
                    resolve();
                })
                .catch(err => reject(err));
        });
    });

    it("Should check whether the given element is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({className: "search-bar"})
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    describe("menu button", () => {
        it("should display menu when click on menu button", () => {
            let menuButton = browser.findElement({className: "menu-button-container"});
            menuButton.click();
            let menu = browser.findElement({className: "menu-container"});

            expect(menu.isDisplayed()).toBe(true);
        });
    });

    afterAll(function () {
        browser.quit();
    });
});