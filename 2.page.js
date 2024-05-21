const { By, Key } = require("selenium-webdriver");

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
    let searchInput = await this.driver.findElement(By.xpath('//div[@class="header-search search"]/input[@class="groups"]'));
    await searchInput.sendKeys(groupNumber);
    await searchInput.sendKeys(Key.RETURN);
  }

  async selectGroupFromResults(groupNumber) {
    await this.driver.sleep(1000);
    await this.driver.findElement(By.xpath(`//div[@class="found-groups row not-print"]//div[contains(text(), '${groupNumber}')]`)).click();
    await this.driver.sleep(5000);
  }

  async checkIfCurrentDayColored() {
    let days = await this.driver.findElements(
      By.xpath(`//div[@class="schedule-week"]/child::div`)
    );
    let thisDay;
    for (let i = 0; i < days.length; i++) {
      if (days.indexOf(days[i]) == new Date().getDay() - 1) {
        thisDay = days[i];
      }
    }
    const result = await thisDay.getAttribute("class")
    return result === "schedule-day schedule-day_today"
  }
}

module.exports = MospolytechPage;
