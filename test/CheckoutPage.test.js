const { Builder, By, until } = require('selenium-webdriver');

(async function checkoutTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Go to product page and click "Buy Now"
    await driver.get('http://localhost:3000/product/notebook-horizon-demo');
    await driver.sleep(2000); 

    const buyNowButton = await driver.findElement(By.xpath('//button[contains(text(), "Buy Now")]'));
    await driver.wait(until.elementIsVisible(buyNowButton), 3000);
    await buyNowButton.click();
    console.log("Buy Now button clicked.");
    // Wait for redirection to checkout
    await driver.wait(until.urlContains('/checkout'), 10000);
    await driver.sleep(2000); 

    // Fill in all form fields slowly 
    const slowType = async (id, text) => {
      const field = await driver.findElement(By.id(id));
      for (const char of text) {
        await field.sendKeys(char);
        await driver.sleep(100); 
      }
    };

    await slowType('name-input', 'Leen');
    await slowType('lastname-input', 'Odeh');
    await slowType('phone-input', '1234567890');
    await slowType('email-address', 'leen0deh@example.com');
    await slowType('name-on-card', 'Leen Odeh');
    await slowType('card-number', '52126598741234567');
    await slowType('expiration-date', '12/26');
    await slowType('cvc', '123');
    await slowType('company', 'Birzeit University.');
    await slowType('address', '123 Ein Senia Street');
    await slowType('apartment', 'Home 4B');
    await slowType('city', 'Jifna');
    await slowType('region', 'Ramallah');
    await slowType('postal-code', '62704');
    await slowType('order-notice', 'Please leave the package at the door.');

    // Click "Pay Now"
    const payNowButton = await driver.findElement(By.xpath('//button[contains(text(), "Pay Now")]'));
    await driver.wait(until.elementIsVisible(payNowButton), 3000);
    await payNowButton.click();

    // Wait for confirmation or redirection
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url !== 'http://localhost:3000/checkout';
    }, 7000);

    console.log('Checkout test passed!');
  } catch (err) {
    console.error('Checkout test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();
