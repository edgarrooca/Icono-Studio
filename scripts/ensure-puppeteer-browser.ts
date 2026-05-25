import { spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const rootDir = process.cwd();
const puppeteerCacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(rootDir, '.cache', 'puppeteer');
const useHeadlessShell = process.env.PUPPETEER_HEADLESS_MODE === 'shell' || process.env.VERCEL === '1';

process.env.PUPPETEER_CACHE_DIR = puppeteerCacheDir;

async function resolveExpectedExecutablePath() {
  return useHeadlessShell ? puppeteer.executablePath({ headless: 'shell' }) : puppeteer.executablePath();
}

async function browserExists() {
  const executablePath = await resolveExpectedExecutablePath();

  try {
    await access(executablePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function installBrowser() {
  await mkdir(puppeteerCacheDir, { recursive: true });
  const browserToInstall = useHeadlessShell ? 'chrome-headless-shell' : 'chrome';
  const cliPath = path.join(rootDir, 'node_modules', 'puppeteer', 'lib', 'puppeteer', 'node', 'cli.js');

  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath, 'browsers', 'install', browserToInstall], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PUPPETEER_CACHE_DIR: puppeteerCacheDir,
        PUPPETEER_SKIP_DOWNLOAD: 'false',
      },
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`La instalación de ${browserToInstall} para Puppeteer terminó con código ${code ?? 'desconocido'}.`));
    });
  });
}

async function main() {
  if (process.env.VERCEL === '1') {
    console.log('Entorno Vercel detectado. Se usará @sparticuz/chromium, saltando instalación manual de navegador.');
    return;
  }

  if (await browserExists()) {
    console.log(`Chrome para Puppeteer ya disponible en ${puppeteerCacheDir}`);
    return;
  }

  console.log(`Instalando Chrome para Puppeteer en ${puppeteerCacheDir}...`);
  await installBrowser();

  if (!(await browserExists())) {
    throw new Error('Chrome para Puppeteer sigue sin estar disponible después de la instalación.');
  }

  console.log('Chrome para Puppeteer instalado correctamente.');
}

main().catch((error) => {
  console.error('No se pudo preparar Chrome para Puppeteer:', error);
  process.exit(1);
});
