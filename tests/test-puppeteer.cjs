const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');
  
  // Click Beneficios tab
  await page.waitForSelector('button');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Beneficios')) {
      await btn.click();
      break;
    }
  }
  
  // Wait a bit for transition and fetch
  await new Promise(r => setTimeout(r, 2000));
  
  // Extract DEBUG pre content if exists
  const debugText = await page.evaluate(() => {
    const pre = document.querySelector('pre');
    return pre ? pre.textContent : 'No <pre> tag found';
  });
  console.log('--- DEBUG INFO ---');
  console.log(debugText);
  
  // Extract cards
  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- PAGE TEXT ---');
  console.log(text.substring(0, 1000)); // just leading text
  
  await browser.close();
})();
