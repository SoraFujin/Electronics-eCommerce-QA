const { Builder, By, until, Key } = require('selenium-webdriver');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function searchTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000');
    await sleep(1000); 

    // Locate the search input
    const searchInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Type here"]')),
      7000
    );
    await sleep(500);

    for (const char of 'ear') {
      await searchInput.sendKeys(char);
      await sleep(400); // wait between keystrokes
    }

    await searchInput.sendKeys(Key.RETURN);
    await sleep(1000); // wait for navigation

    // Wait for URL to include /search
    await driver.wait(until.urlContains('/search'), 7000);

    // Wait for product results (h3 message or product items)
    await driver.wait(until.elementLocated(By.css('h3')), 7000);
    await sleep(2000); // let results be visible

    console.log(' Search test passed!');
  } catch (err) {
    console.error(' Search test failed:', err.message);
  } finally {
    await sleep(1000); // keep window open for a moment
    await driver.quit();
  }
})();
