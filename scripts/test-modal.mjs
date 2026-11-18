import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Navigate to Slide 3 (HR Dashboard & Employees) via navigation
await page.locator('button:has-text("Explore Presentation")').click();
await page.waitForTimeout(800);
await page.locator('text=Next: HR Dashboard & Employees').click();
await page.waitForTimeout(1000);

// Find the screenshot container on HR Dashboard (left card)
const imgBox = page.locator('img[alt="HR Dashboard"]');
console.log('Image found, clicking to enlarge...');
await imgBox.click();

await page.waitForTimeout(500);

// Check if modal opened
const modal = page.locator('text=HR Dashboard · Full Resolution View');
const isVisible = await modal.isVisible();
console.log('Modal visible:', isVisible);

// Test Zoom In
const plusBtn = page.locator('button[title="Zoom In"]');
await plusBtn.click();
await page.waitForTimeout(200);

// Test Esc key to close
await page.keyboard.press('Escape');
await page.waitForTimeout(500);

const isClosed = !(await modal.isVisible());
console.log('Modal closed after Esc:', isClosed);

await browser.close();

if (isVisible && isClosed) {
  console.log('✅ Click-to-enlarge and Esc key passed with flying colors!');
} else {
  console.error('❌ Modal test failed');
  process.exit(1);
}
