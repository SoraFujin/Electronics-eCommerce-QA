const { Builder, By, Key, until } = require('selenium-webdriver');

(async function createCategory() {
  //launch browser
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    //navigate to login page
    await driver.get('http://localhost:3000/login');

    // fill in adim credentials
    const emailInput = await driver.wait(until.elementLocated(By.name('email')), 10000);
    await emailInput.sendKeys('furat@hotmail.com');

    const passwordInput = await driver.wait(until.elementLocated(By.name('password')), 10000);
    await passwordInput.sendKeys('furatnajihmadi7');

  const loginButton = await driver.wait(
  until.elementLocated(By.xpath("//button[contains(text(), 'Sign in')]")),
  10000
);
await loginButton.click();

    //redirect to admin > ctaegories page
    await driver.sleep(3000);
         await driver.get('http://localhost:3000/admin');

     await driver.get('http://localhost:3000/admin/categories');

    // click "Add New Category" button
 const addBtn = await driver.wait(
  until.elementLocated(By.xpath("//button[contains(text(), 'Add new category')]")),
  10000
);
await addBtn.click();

    // add category 'laptops'
    await driver.sleep(1000);
    await driver.findElement(By.name('addCategory')).sendKeys('laptops');

    //create the category
    const submitBtn = await driver.findElement(By.xpath("//button[contains(text(),'Create category')]"));
    await submitBtn.click();

    //wait and check if the new category appears
    await driver.sleep(2000);
    console.log("Category 'laptops' created successfully.");

  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    await driver.quit();
  }
})();
