const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");
const { describe, it, before, after } = mocha;
const MospolytechPage = require('../pages/2.page');

describe('Mospolytech Schedule Test', function() {
  let driver;
  let mospolytechPage;

  this.timeout(30000);

  before(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    mospolytechPage = new MospolytechPage(driver);
  });

  after(async function() {
    await driver.quit();
  });

  it('should open the Mospolytech website', async function() {
    try {
      await mospolytechPage.open("https://mospolytech.ru/");
      console.log("Opened Mospolytech website");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_open_website.png");
      throw error;
    }
  });

  it('should click on the schedule button', async function() {
    try {
      await mospolytechPage.clickScheduleButton();
      console.log("Clicked on the schedule button");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_click_schedule_button.png");
      throw error;
    }
  });

  it('should click to view the schedule on the site', async function() {
    try {
      await mospolytechPage.clickToShedule();
      console.log("Clicked to view the schedule on the site");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_click_to_schedule.png");
      throw error;
    }
  });

  it('should switch to the new schedule window', async function() {
    try {
      const handles = await driver.getAllWindowHandles();
      await driver.switchTo().window(handles[1]);
      console.log("Switched to the new schedule window");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_switch_window.png");
      throw error;
    }
  });

  it('should search for the group', async function() {
    try {
      await mospolytechPage.searchGroup('221-321');
      console.log("Searched for the group 221-321");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_search_group.png");
      throw error;
    }
  });

  it('should select the group from results', async function() {
    try {
      await mospolytechPage.selectGroupFromResults('221-321');
      console.log("Selected the group 221-321 from the results");
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_select_group.png");
      throw error;
    }
  });

  it('should check if the current day is colored', async function() {
    try {
      const isCurrentDayColored = await mospolytechPage.checkIfCurrentDayColored();
      console.log("Checked if the current day is colored");
      assert.strictEqual(isCurrentDayColored, true);
    } catch (error) {
      await mospolytechPage.saveScreenshot("screen_error_check_current_day.png");
      throw error;
    }
  });
});
