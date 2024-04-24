const { Builder, By, Key } = require("selenium-webdriver");

class MospolytechPage {
  constructor(driver) {
    this.driver = driver;
  }

  async clickScheduleButton() {
    await this.driver.findElement(By.xpath('//*[@title="Расписание"]')).click();
  }

  async clickToShedule() {
    await this.driver.findElement(By.xpath('//a[span[text()="Смотрите на сайте"]]')).click();
  } 

  async searchGroup(groupNumber) {
    await this.driver.findElement(By.xpath('//div[@class="header-search search"]/input[@class="groups"]')).sendKeys(groupNumber);
    await this.driver.findElement(By.xpath('//div[@class="header-search search"]/input[@class="groups"]')).sendKeys(Key.RETURN);
  }

  async selectGroupFromResults(groupNumber) {
    await this.driver.sleep(1000)
    await this.driver.findElement(By.xpath(`//div[@class="found-groups row not-print"]//div[contains(text(), '${groupNumber}')]`)).click();
    await this.driver.sleep(5000)
  }
}

(async function mospolytechTest() {
  const driver = await new Builder().forBrowser("chrome").build();
  const mospolytechPage = new MospolytechPage(driver);

  try {
    await driver.get("https://mospolytech.ru/");
    await mospolytechPage.clickScheduleButton();
    await mospolytechPage.clickToShedule();

    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    await mospolytechPage.searchGroup('221-321');
    await mospolytechPage.selectGroupFromResults('221-321');

  } catch (error) {
    driver.takeScreenshot().then(function (image) {
        require("fs").writeFileSync("screen_error", image, "base64");
      });
    console.log(e);
  } finally {
    await driver.quit();
  }
})();