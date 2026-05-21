import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 1. Desktop - Main
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('https://mudanzaslapompa.es', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/desktop.png', fullPage: false });

  // 2. Desktop - Reto (Full Page)
  await page.screenshot({ path: 'public/projects/lapompa/desktop-full.png', fullPage: true });

  // 3. Desktop - Budget widget scrolled into view
  // Let's scroll a bit to capture the middle of the page or wherever the widget is
  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/lapompa/desktop-form.png', fullPage: false });

  // 4. Mobile - Main
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('https://mudanzaslapompa.es', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/mobile1.png', fullPage: false });

  // 5. Mobile - Scrolled (instead of 404 page)
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/lapompa/mobile2.png', fullPage: false });

  // Let's get a full page mobile too just in case
  await page.screenshot({ path: 'public/projects/lapompa/mobile-full.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured!");
})();
