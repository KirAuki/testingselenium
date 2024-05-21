const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");
const { describe, it, before, after } = mocha;
const MospolytechPage = require('../2.page');

describe('Mospolytech Schedule Test', function() {
  let driver;
  let mospolytechPage;

  this.timeout(30000); // Setting a higher timeout for slow connections

  before(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    mospolytechPage = new MospolytechPage(driver);
  });

  after(async function() {
    await driver.quit();
  });

  it('should navigate to the schedule page and search for a group', async function() {
    try {
      await driver.get("https://mospolytech.ru/");
      await mospolytechPage.clickScheduleButton();
      await mospolytechPage.clickToShedule();

      const handles = await driver.getAllWindowHandles();
      await driver.switchTo().window(handles[1]);

      await mospolytechPage.searchGroup('221-321');
      await mospolytechPage.selectGroupFromResults('221-321');
      const isCurrentDayColored = await mospolytechPage.checkIfCurrentDayColored();
      assert.strictEqual(isCurrentDayColored, true,);
    } catch (error) {
      driver.takeScreenshot().then(function (image) {
        require("fs").writeFileSync("screen_error", image, "base64");
      });
      throw error;
    }
  });
});
