const { Builder } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const YandexMarketPage = require('../pages/3.page');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Yandex Market Laptop Filter Test', function() {
    this.timeout(30000);
    let driver;
    let yandexMarket;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        yandexMarket = new YandexMarketPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    it('should filter laptops by price and log first five products', async function() {
        try {
            await yandexMarket.navigate();
            await yandexMarket.selectCategory();
            await yandexMarket.logFirstFiveLaptops();
            await yandexMarket.setPriceFilter('60000', '110000');

        } catch (error) {
            const testName = this.test.title.replace(/\s+/g, '_');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filePath = path.join(__dirname, `${testName}_${timestamp}.png`);
            await yandexMarket.saveScreenshot(filePath);
            console.error(`Test failed: ${error.message}`);
            assert.fail(`Test failed: ${error.message}`);
        }
    });
});
