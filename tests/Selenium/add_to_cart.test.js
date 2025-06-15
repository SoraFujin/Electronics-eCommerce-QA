const { Builder, By, until } = require('selenium-webdriver');

(async function addToCartTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // go to login page
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

    // wait for the "View product" link to be present
    const viewProductLink = await driver.wait(until.elementLocated(By.className('block flex justify-center items-center w-full uppercase bg-white px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2')), 10000);
    await viewProductLink.click();

    // wait for the product detail page to load
    const addToCartButton = await driver.wait(until.elementLocated(By.className("btn w-[200px] text-lg border border-gray-300 border-1 font-normal bg-white text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 transition-all uppercase ease-in max-[500px]:w-full")), 10000);
    await addToCartButton.click();

    // navigate to the Cart page
    await driver.get('http://localhost:3000/cart');

    // wait for the cart items to load
    await driver.wait(until.elementLocated(By.className("block w-6 h-6 bg-blue-600 text-white rounded-full flex justify-center items-center absolute top-[-17px] right-[-22px]")), 10000);
  //  const cartItems = await driver.findElements(By.className("block w-6 h-6 bg-blue-600 text-white rounded-full flex justify-center items-center absolute top-[-17px] right-[-22px]"));
    console.log('Add to cart test passed');

  } catch (error) {
    console.error('An error occurred:', error);
  } 
  finally {
    await driver.quit();
  }
})();
