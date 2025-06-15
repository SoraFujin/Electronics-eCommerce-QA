const { Builder, By, until } = require('selenium-webdriver');

(async function testDeleteFromWishlist() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Login
    await driver.get('http://localhost:3000/login');

    const emailInput = await driver.wait(until.elementLocated(By.name('email')), 10000);
    await emailInput.sendKeys('test@example.com');

    const passwordInput = await driver.wait(until.elementLocated(By.name('password')), 10000);
    await passwordInput.sendKeys('Test123!');

    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await loginButton.click();

    // Optional: Wait for navigation after login
    await driver.sleep(2000);

    // Step 2: Navigate to Wishlist
    await driver.get('http://localhost:3000/wishlist');

    // Step 3: Wait for the delete button to be visible and click it
    const deleteFromWishlistBtn = await driver.wait(
      until.elementLocated(By.xpath("//span[text()='remove from the wishlist']")),
      10000
    );
    await deleteFromWishlistBtn.click();

    // Optional: Wait for toast or DOM update
    await driver.sleep(2000);

    // Step 4: Confirm item is removed (no more such buttons)
    const buttons = await driver.findElements(By.xpath("//span[text()='remove from the wishlist']"));
    if (buttons.length === 0) {
      console.log('✅ Wishlist delete test passed');
    } else {
      console.log('❌ Wishlist item was not removed');
    }

  } catch (err) {
    console.error('❌ Wishlist delete test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
