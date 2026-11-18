import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PNG_DIR = path.join(ROOT, 'exports', 'png');

if (!fs.existsSync(PNG_DIR)) fs.mkdirSync(PNG_DIR, { recursive: true });

// Clean previous pngs
fs.readdirSync(PNG_DIR).forEach(f => {
  if (f.endsWith('.png')) fs.unlinkSync(path.join(PNG_DIR, f));
});

const TOTAL_SLIDES = 11;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 1920, height: 1080 });

let BASE_URL = 'http://localhost:5173';
try {
  const resp = await fetch(BASE_URL);
  if (!resp.ok) BASE_URL = 'http://localhost:4173';
} catch (e) {
  BASE_URL = 'http://localhost:4173';
}

console.log(`Connecting to ${BASE_URL}...`);
await page.goto(BASE_URL, { waitUntil: 'networkidle' });

// Allow initial fonts and styles to settle
await page.waitForTimeout(2000);

// Ensure we are at slide 1 (Home)
await page.keyboard.press('Home');
await page.waitForTimeout(1500);

for (let i = 0; i < TOTAL_SLIDES; i++) {
  if (i > 0) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2000); // allow staggered row-by-row card animations to fully settle
  }

  const outPath = path.join(PNG_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);

  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log(`📸 Captured slide ${i + 1} / ${TOTAL_SLIDES} → slide-${String(i + 1).padStart(2, '0')}.png`);
}

await browser.close();
console.log(`✅ All ${TOTAL_SLIDES} slides successfully exported to ${PNG_DIR}`);
