const { By, Key } = require("selenium-webdriver");
const BasePage = require("./Basepage");

class MospolytechPage extends BasePage {
  constructor(driver) {
    super(driver);
  }

  async clickScheduleButton() {
    await this.click(By.xpath('//*[@title="Расписание"]'));
  }

  async clickToShedule() {
    await this.click(By.xpath('//a[span[text()="Смотрите на сайте"]]'));
  } 

  async searchGroup(groupNumber) {
    await this.typeText(By.xpath('//div[@class="header-search search"]/input[@class="groups"]'), groupNumber);
    await this.driver.findElement(By.xpath('//div[@class="header-search search"]/input[@class="groups"]')).sendKeys(Key.RETURN);
  }

  async selectGroupFromResults(groupNumber) {
    await this.driver.sleep(1000);
    await this.click(By.xpath(`//div[@class="found-groups row not-print"]//div[contains(text(), '${groupNumber}')]`));
    await this.driver.sleep(5000);
  }

  async checkIfCurrentDayColored() {
    let days = await this.driver.findElements(
      By.xpath(`//div[@class="schedule-week"]/child::div`)
    );
    let thisDay;
    for (let i = 0; i < days.length; i++) {
      if (days.indexOf(days[i]) === new Date().getDay() - 1) {
        thisDay = days[i];
      }
    }
    const result = await thisDay.getAttribute("class");
    return result === "schedule-day schedule-day_today";
  }
}

module.exports = MospolytechPage;
