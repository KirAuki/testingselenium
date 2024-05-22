const { By, until } = require('selenium-webdriver');
const BasePage = require('./Basepage');

class YandexMarketPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.url = 'https://market.yandex.ru';
        this.catalogButton = By.xpath("//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']");
        this.laptopsAndComputers = By.xpath("//span[contains(text(), 'Ноутбуки и компьютеры')]");
        this.laptopsSubcategory = By.xpath("//li//a[@href='/catalog--noutbuki/54544/list?hid=91013']");
        this.firstFiveLaptops = By.xpath("//h3[@data-auto='snippet-title']");
        this.productPrices = By.xpath("//div[@data-auto-themename='listDetailed']//span[@data-auto='snippet-price-current']");
        this.minPriceField = By.xpath("//input[contains(@aria-labelledby, 'labeltextfield') and contains(@class, '_3MpOq')]");
        this.maxPriceField = By.xpath("//input[contains(@aria-labelledby, 'labeltextfield') and contains(@class, '_3DAWe')]");
    }

    async navigate() {
        await this.open(this.url);
        console.log('Открыта страница Yandex Market');
    }

    async selectCategory() {
        await this.click(this.catalogButton);
        await this.driver.sleep(5000);
        let laptopsAndComputers = await this.driver.findElement(this.laptopsAndComputers);
        await this.driver.actions({ async: true }).move({ origin: laptopsAndComputers}).perform();
        await this.driver.sleep(1000);
        await this.click(this.laptopsSubcategory);
        await this.driver.sleep(3000);
        console.log('Страница ноутбуков открыта');
    }

    async logFirstFiveLaptops() {
        let laptopNames = await this.driver.findElements(this.firstFiveLaptops);
        let laptopPrices = await this.driver.findElements(this.productPrices);

        for (let i = 0; i < 5; i++) {
            let name = await laptopNames[i].getText();
            let price = await laptopPrices[i].getText();
            console.log(`Ноутбук: ${i + 1}: ${name} - ${price}`);
        }
    }
    
    async setPriceFilter(minPrice, maxPrice) {
        let minPriceElement = await this.driver.findElement(this.minPriceField);
        let maxPriceElement = await this.driver.findElement(this.maxPriceField);

        await minPriceElement.clear();
        await minPriceElement.sendKeys(minPrice);

        await maxPriceElement.clear();
        await maxPriceElement.sendKeys(maxPrice);

        await this.driver.sleep(3000);
        console.log(`Фильтр цен установлен: от ${minPrice} до ${maxPrice}`);
    }

}

module.exports = YandexMarketPage;
