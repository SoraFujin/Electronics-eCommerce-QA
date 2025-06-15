const { Builder, By, until } = require('selenium-webdriver');

(async function testDeleteFromCart() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');

    const emailInput = await driver.wait(until.elementLocated(By.name('email')), 10000);
    await emailInput.sendKeys('test@example.com');

    const passwordInput = await driver.wait(until.elementLocated(By.name('password')), 10000);
    await passwordInput.sendKeys('Test123!');

    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await loginButton.click();

    await driver.get('http://localhost:3000/cart');

    await driver.wait(until.elementLocated(By.css('ul[role="list"] li')), 10000);

    const deleteFromCartBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[span[text()='Remove']]")),
      10000
    );
    await deleteFromCartBtn.click();

    console.log('✅ Cart delete test passed');
  } catch (err) {
    console.error('❌ Cart delete test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
