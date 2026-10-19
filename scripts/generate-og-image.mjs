import { constants } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const outputPath = path.join(publicDir, 'og-image.png');
const puppeteerCacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(rootDir, '.cache', 'puppeteer');
process.env.PUPPETEER_CACHE_DIR = puppeteerCacheDir;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; font-family: -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
  .card {
    position: relative;
    width: 1200px; height: 630px;
    background: #0B1B63;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
  }
  .blob1 { position: absolute; top: -140px; right: -120px; width: 520px; height: 520px; border-radius: 9999px; background: rgba(158,214,241,0.16); filter: blur(10px); }
  .blob2 { position: absolute; bottom: -160px; left: -140px; width: 480px; height: 480px; border-radius: 9999px; background: rgba(158,214,241,0.10); filter: blur(10px); }
  .blob3 { position: absolute; top: 90px; left: 110px; width: 190px; height: 190px; border-radius: 9999px; background: rgba(255,230,168,0.10); filter: blur(6px); }
  .logo { position: relative; width: 240px; height: auto; margin-bottom: 34px; filter: brightness(0) invert(1); }
  h1 { position: relative; font-size: 74px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.05; color: #FFFFFF; }
  h1 span { color: #9ED6F1; }
  .divider { position: relative; width: 90px; height: 5px; border-radius: 9999px; background: #9ED6F1; margin: 28px auto; }
  p { position: relative; font-size: 30px; font-weight: 500; color: rgba(255,255,255,0.78); letter-spacing: -0.01em; }
  .badge { position: relative; display: inline-block; background: rgba(230,244,251,0.14); border: 1px solid rgba(158,214,241,0.35); color: #FFFFFF; font-size: 17px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; padding: 8px 22px; border-radius: 9999px; margin-bottom: 30px; }
</style>
</head>
<body>
  <div class="card">
    <div class="blob1"></div>
    <div class="blob2"></div>
    <div class="blob3"></div>
    <div class="badge">Diseño web en Valencia</div>
    <img class="logo" src="http://127.0.0.1:8457/icono-studio-logo.png" alt="" />
    <h1>Webs que transmiten<br/>confianza <span>y captan clientes</span></h1>
    <div class="divider"></div>
    <p>Diseño web · SEO · Soporte continuo</p>
  </div>
</body>
</html>`;

async function main() {
  const executablePath = await puppeteer.executablePath();
  await access(executablePath, constants.X_OK);

  // Tiny static server so the logo can be loaded from public/.
  const { createServer } = await import('node:http');
  const { readFile } = await import('node:fs/promises');
  const server = createServer(async (req, res) => {
    const file = path.join(publicDir, req.url.replace(/^\//, '') || '');
    try {
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(8457, '127.0.0.1', resolve));

  try {
    const browser = await puppeteer.launch({
      headless: 'shell',
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outputPath, type: 'png' });
    await browser.close();
    console.log('og-image generada:', outputPath);
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error('Error generando og-image:', error);
  process.exit(1);
});
