const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const TodoPage = require('../1.2.page');

const mocha = require('mocha');
const { describe, it, before, after } = mocha;

describe('Todo Application Test', function() {
    let driver;
    let todoPage;
    const total = 5;
    let remaining = 5;

    this.timeout(30000); 

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        todoPage = new TodoPage(driver);
        await todoPage.open();
    });

    after(async function() {
        await driver.quit();
    });

    it('should display correct initial remaining items text', async function() {
        let text = await todoPage.getRemainingItemsText();
        assert.equal(text, todoPage.expectedRemainingItemsText(remaining, total));
    });

    it('should toggle items and update remaining count correctly', async function() {
        for (let i = 1; i <= total; i++) {
            assert.equal(await todoPage.getItemClass(i), "done-false");
            await todoPage.toggleItem(i);
            remaining--;
            assert.equal(await todoPage.getItemClass(i), "done-true");
            await driver.sleep(1000); // Simulate wait time for UI update
        }
    });

    it('should add a new item and mark it as done', async function() {
        await todoPage.addItem("New Item");
        await todoPage.toggleItem(6);
        assert.equal(await todoPage.getItemClass(6), "done-true");
    });
});