const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');

class TodoPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://lambdatest.github.io/sample-todo-app/';
    }

    async open() {
        await this.driver.get(this.url);
    }

    async getRemainingItemsText() {
        let elem = await this.driver.findElement(By.xpath("//span[@class='ng-binding']"));
        return await elem.getText();
    }

    expectedRemainingItemsText(remaining, total) {
        return `${remaining} of ${total} remaining`;
    }

    async getItemClass(index) {
        let item = await this.driver.findElement(By.xpath(`//input[@name='li${index}']/following-sibling::span`));
        return await item.getAttribute('class');
    }

    async toggleItem(index) {
        let itemCheckbox = await this.driver.findElement(By.xpath(`//input[@name='li${index}']`));
        await itemCheckbox.click();
    }

    async addItem(text) {
        let inputField = await this.driver.findElement(By.id('sampletodotext'));
        await inputField.sendKeys(text);
        let addButton = await this.driver.findElement(By.id('addbutton'));
        await addButton.click();
    }
}

let total = 5;
let remaining = 5;

(async function runTest() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    let todoPage = new TodoPage(driver);

    try {
        await todoPage.open();
        
        let text = await todoPage.getRemainingItemsText();
        assert.equal(text, todoPage.expectedRemainingItemsText(remaining, total));

        for (let i = 1; i <= total; i++) {
            assert.equal(await todoPage.getItemClass(i), "done-false");
            await todoPage.toggleItem(i);
            remaining--;
            assert.equal(await todoPage.getItemClass(i), "done-true");
            await driver.sleep(1000);
        }

        await todoPage.addItem("New Item");
        await todoPage.toggleItem(6);
        assert.equal(await todoPage.getItemClass(6), "done-true");

        await driver.sleep(5000);
    } catch (e) {
        driver.takeScreenshot().then(function (image) {
            require("fs").writeFileSync("screen_error", image, "base64");
        });
        console.log(e);
    } finally {
        await driver.quit();
    }
})();