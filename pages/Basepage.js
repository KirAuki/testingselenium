const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async getTextFromElement(locator) {
        await this.driver.wait(until.elementLocated(locator), 5000);
        return await this.driver.findElement(locator).getText();
    }

    async typeText(locator, text) {
        const element = await this.driver.wait(until.elementLocated(locator), 5000);
        await element.sendKeys(text);
    }

    async click(locator) {
        const element = await this.driver.wait(until.elementLocated(locator), 5000);
        await element.click();
    }

    async saveScreenshot(fileName) {
        const image = await this.driver.takeScreenshot();
        fs.writeFileSync(fileName, image, 'base64');
    }

    async close(delay = 0) {
        if (delay) await this.driver.sleep(delay);
        await this.driver.quit();
    }
}

module.exports = BasePage;
