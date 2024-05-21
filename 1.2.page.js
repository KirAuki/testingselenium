const { Builder, By } = require('selenium-webdriver');

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

module.exports = TodoPage;
