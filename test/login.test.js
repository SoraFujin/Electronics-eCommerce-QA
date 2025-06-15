const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');
    await driver.sleep(1000); // pause 1 second after page load

    // Wait for email input and type email
    await driver.wait(until.elementLocated(By.id('email')), 5000);
    await driver.findElement(By.id('email')).sendKeys('odehleen321@gmail.com');
    await driver.sleep(1000); // pause 1 second after entering email

    // Type password
    await driver.findElement(By.id('password')).sendKeys('leen1802');
    await driver.sleep(1000); // pause 1 second after entering password

    // Wait for submit button and click
    const submitButton = await driver.findElement(By.css('form button[type="submit"]'));
    await driver.wait(until.elementIsVisible(submitButton), 3000);
    await driver.sleep(500);  // half-second pause before clicking
    await submitButton.click();

    // Wait for URL to be outside of /login and under your base URL
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.startsWith('http://localhost:3000') && !url.includes('/login');
    }, 7000);
    await driver.sleep(5000); // pause 1 second after redirect

    await driver.wait(until.elementLocated(By.css('h1, h2, nav, header')), 5000);

    console.log('Login test passed!');
    await driver.takeScreenshot().then(
  function(image) {
    require('fs').writeFileSync('screenshot.png', image, 'base64');
  }
);

  } catch (err) {
    console.error('Login test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
