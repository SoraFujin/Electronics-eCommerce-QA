const { Builder, By, until } = require('selenium-webdriver');

(async function testRegister() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/register');

const name = await driver.wait(until.elementLocated(By.name('name')), 10000);
    await name.sendKeys('Faisal');        
    await driver.findElement(By.id('lastname')).sendKeys('Shehadeh');
    await driver.findElement(By.id('email')).sendKeys('faisal@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('faisal123456');
const confirmPass = await driver.wait(until.elementLocated(By.name('confirmpassword')), 10000);
    await confirmPass.sendKeys('faisal123456');
    //await driver.findElement(By.className('register-button')).click();
    await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000).click();

 //   await driver.wait(until.urlContains('dashboard'), 10000);
    console.log('Registration test passed');
  } catch (err) {
    console.error('Registration test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
