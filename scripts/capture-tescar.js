import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Helper function to slowly scroll down to trigger lazy loading & animations
  const autoScroll = async (page) => {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  };

  // 1. Desktop - Main
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('https://tescarluxurygreen.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/tescar/desktop.png', fullPage: false });

  // Pre-scroll the entire page to trigger lazy loaded images
  await autoScroll(page);
  // Wait a bit extra for any slow network images to finish loading after scrolling
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll back to top just in case it affects fixed headers
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));

  // 2. Desktop - Full Page
  await page.screenshot({ path: 'public/projects/tescar/desktop-full.png', fullPage: true });

  // 3. Desktop - Scrolled view for imgPc1
  await page.evaluate(() => { window.scrollBy(0, 1000); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/tescar/desktop-scrolled.png', fullPage: false });

  // We only need to fix the desktop full page really, but let's just close
  // and we won't recapture the mobiles if we don't have to, but running them is fast.
  await browser.close();
  console.log("Tescar Screenshots (with auto-scroll) captured!");
})();
