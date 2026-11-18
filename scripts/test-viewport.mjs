import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1536, height: 864 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Navigate to Slide 2
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(1000);

await page.screenshot({ path: 'exports/test-1536x864-slide2.png' });
console.log('✅ Captured 1536x864 test screenshot');

await browser.close();
