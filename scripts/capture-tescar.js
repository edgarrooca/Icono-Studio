import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 1. Desktop - Main
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('https://tescarluxurygreen.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/tescar/desktop.png', fullPage: false });

  // 2. Desktop - Full Page
  await page.screenshot({ path: 'public/projects/tescar/desktop-full.png', fullPage: true });

  // 3. Desktop - Scrolled view for imgPc1
  await page.evaluate(() => { window.scrollBy(0, 1000); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/desktop-scrolled.png', fullPage: false });

  // 4. Mobile captures (1 to 5)
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('https://tescarluxurygreen.com', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: 'public/projects/tescar/mobile1.png', fullPage: false });

  await page.evaluate(() => { window.scrollBy(0, 800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/mobile2.png', fullPage: false });

  await page.evaluate(() => { window.scrollBy(0, 800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/mobile3.png', fullPage: false });

  await page.evaluate(() => { window.scrollBy(0, 800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/mobile4.png', fullPage: false });

  await page.evaluate(() => { window.scrollBy(0, 800); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/mobile5.png', fullPage: false });

  await browser.close();
  console.log("Tescar Screenshots captured!");
})();
