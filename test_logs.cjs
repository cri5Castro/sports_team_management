const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Capture and print console messages
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER_PAGE_ERROR:', err.toString()));

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    const html = await page.content();
    console.log("INITIAL_VIEW:", html.includes("Registro de Ausencias") ? "OK" : "FAILED");

    // Click 'Beneficios' tab
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const benBtn = buttons.find(b => b.textContent && b.textContent.includes('Beneficios'));
        if (benBtn) {
            console.log("Clicked Beneficios!");
            benBtn.click();
        } else {
            console.log("COULD NOT FIND TAB");
        }
    });

    // Wait a bit
    await new Promise(r => setTimeout(r, 2000));

    const html2 = await page.content();
    console.log(html2);
    if (html2.includes("Beneficios Sharkes")) {
        console.log("VIEW_SWITCH_OK");
    }
    if (html2.includes("No hay promociones activas")) {
        console.log("NO_PROMOS");
    }
    if (html2.includes("aletas tlate")) {
        console.log("PROMO_FOUND");
    }

    await browser.close();
})();
