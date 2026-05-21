import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://mudanzaslapompa.es', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/desktop.png', fullPage: false });

  await page.goto('https://mudanzaslapompa.es/presupuesto', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/desktop-form.png', fullPage: false });

  // Mobile
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  await page.goto('https://mudanzaslapompa.es', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/mobile1.png', fullPage: false });

  await page.goto('https://mudanzaslapompa.es/presupuesto', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/lapompa/mobile2.png', fullPage: false });

  await browser.close();
  console.log("Screenshots captured!");
})();
