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

    afterAll(function () {
        browser.quit();
    });
});