import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Mobile - Mudanzas La Pompa (extra shots)
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('https://mudanzaslapompa.es', { waitUntil: 'networkidle2' });
  
  // scroll a bit more for mobile3
  await page.evaluate(() => { window.scrollBy(0, 1800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/lapompa/mobile3.png', fullPage: false });

  // scroll a bit more for mobile4
  await page.evaluate(() => { window.scrollBy(0, 800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/lapompa/mobile4.png', fullPage: false });

  await browser.close();
  console.log("La Pompa Extra Screenshots captured!");
})();
