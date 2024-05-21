const assert = require("assert");
const { Builder,Browser, By } = require('selenium-webdriver');



let total = 5;
let remaining = 5;
runTest();


const expectedText = (remaining,total) => `${remaining} of ${total} remaining`;
const getNewText = async (elem) => {
    const text = await elem.getText();
    return text
}

async function runTest() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('https://lambdatest.github.io/sample-todo-app/');

        let text = await getNewText(await driver.findElement(By.xpath("//span[@class='ng-binding']")));
        assert.equal(text, expectedText(remaining,total));

        for (let i = 1; i <= total; i++) {
  
            let Item = await driver.findElement(By.xpath(`//input[@name='li${i}']/following-sibling::span`));
            let ItemClass = await Item.getAttribute('class');
            assert.equal(ItemClass, "done-false");
            
            
            await driver.findElement(By.xpath(`//input[@name='li${i}']`)).click();
            remaining--;
            ItemClass= await Item.getAttribute("class");
            assert.equal(ItemClass, "done-true");
            await driver.sleep(1000);
          }


        await driver.findElement(By.id("sampletodotext")).sendKeys("New Item");
        await driver.sleep(1000);
        await driver.findElement(By.id("addbutton")).click();
        await driver.findElement(By.name("li6")).click();
        let Item = await driver.findElement(
            By.xpath("//input[@name='li6']/following-sibling::span")
        );
        itemClass = await Item.getAttribute("class");
        assert.equal(itemClass, "done-true");

        await driver.sleep(5000);
    } catch (e) {
        driver.takeScreenshot().then(function (image) {
          require("fs").writeFileSync("screen_error", image, "base64");
        });
        console.log(e);

    } finally {
        // Закрытие браузера
        await driver.quit();
    }
}


