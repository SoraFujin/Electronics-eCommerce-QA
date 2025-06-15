const { Builder, By, until } = require('selenium-webdriver');

(async function testWishlist() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Log in
    await driver.get('http://localhost:3000/login');

    // enter login credentials
    const emailInput = await driver.wait(until.elementLocated(By.name('email')), 10000);
    await emailInput.sendKeys('furat@gmail.com');

    const passwordInput = await driver.wait(until.elementLocated(By.name('password')), 10000);
    await passwordInput.sendKeys('furatnajihmadi7');

    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await loginButton.click();

    // navigate search page and pass "smart watch" item 
    await driver.get('http://localhost:3000/search?search=smart%20watch');
    const viewProductLink = await driver.wait(until.elementLocated(By.className('block flex justify-center items-center w-full uppercase bg-white px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2')), 10000);
    await viewProductLink.click();

        const addToWishlist = await driver.wait(until.elementLocated(By.id('addToWishlist')), 10000);
await addToWishlist.click();

await driver.get('http://localhost:3000/wishlist');

    // Click on a product to go to its detail page
    // await driver.findElement(By.className('product-card')).click();

    // // Add to wishlist
    // await driver.wait(until.elementLocated(By.className('wishlist-button')), 5000);
    // await driver.findElement(By.className('wishlist-button')).click();

    console.log('Add to wishlist test passed');
  } catch (err) {
    console.error('Add to wishlist test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
