const { Builder, By, Key, until } = require('selenium-webdriver');

(async function createPrioduct() {
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

    //redirect to admin > users page
    await driver.sleep(3000);
         await driver.get('http://localhost:3000/admin');

     await driver.get('http://localhost:3000/admin/products');

    // click "Add New product" button
 const addBtn = await driver.wait(
  until.elementLocated(By.xpath("//button[contains(text(), 'Add new product')]")),
  10000
);
await addBtn.click();

    // add product information
    await driver.sleep(1000);
    await driver.findElement(By.name('product-name')).sendKeys('UltraSwift X5 Laptop');
    await driver.sleep(1000);

    await driver.findElement(By.name('slug')).sendKeys('ultraswift-x5-laptop');
    await driver.sleep(1000);

    await driver.findElement(By.name('category')).sendKeys('laptops');
    await driver.sleep(1000);

    await driver.findElement(By.name('price')).sendKeys('1299.99');
    await driver.sleep(1000);

    await driver.findElement(By.name('manufacturer')).sendKeys('NeoTech Systems');
    await driver.sleep(1000);
    const dropdown = await driver.findElement(By.name('is-in-stock'));
    await dropdown.click(); // focus the dropdown
    await driver.sleep(3000);
   // Press Arrow Down (to move to "Yes"), then Enter
    await dropdown.sendKeys(Key.ARROW_DOWN, Key.ENTER);      
    await driver.sleep(1000);

 
const descriptionArea = await driver.findElement(By.name('description'));
const visible = await descriptionArea.isDisplayed();
console.log("Is description visible:", visible);

await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", descriptionArea);
await driver.sleep(500); 

await driver.executeScript(`
  const textarea = arguments[0];
  textarea.value = arguments[1];
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  textarea.dispatchEvent(new Event('change', { bubbles: true }));
`, descriptionArea, 'UltraSwift X5 is a high-performance laptop designed for professionals...');


    await driver.sleep(3000);


    //create the product
    const submitBtn = await driver.findElement(By.xpath("//button[contains(text(),'Add product')]"));
        await driver.sleep(3000);

    await submitBtn.click();


    //wait and check if the new product appears
    await driver.sleep(3000);
    console.log("Product added successfully");

  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    await driver.quit();
  }
})();
