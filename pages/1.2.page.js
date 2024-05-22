const { By } = require('selenium-webdriver');
const BasePage = require('./Basepage');

class TodoPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async openHomepage() {
        await this.open('https://lambdatest.github.io/sample-todo-app/');
    }

    async getRemainingItemsText() {
        return await this.getTextFromElement(By.xpath("//span[@class='ng-binding']"));
    }

    expectedRemainingItemsText(remaining, total) {
        return `${remaining} of ${total} remaining`;
    }

    async getItemClass(index) {
        let item = await this.driver.findElement(By.xpath(`//input[@name='li${index}']/following-sibling::span`));
        return await item.getAttribute('class');
    }

    async toggleItem(index) {
        await this.click(By.xpath(`//input[@name='li${index}']`));
    }

    async addItem(text) {
        await this.typeText(By.id('sampletodotext'), text);
        await this.click(By.id('addbutton'));
    }
}

module.exports = TodoPage;
