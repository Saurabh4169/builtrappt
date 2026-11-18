import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const browser = await chromium.launch();
const page = await browser.newPage();
const srcFile = path.join(ROOT, 'public', 'assets', 'hr-dashboard.jpg');
const base64Data = fs.readFileSync(srcFile).toString('base64');
const dataUri = `data:image/jpeg;base64,${base64Data}`;

await page.setContent(`
  <!DOCTYPE html>
  <html>
    <head><style>body { margin: 0; padding: 0; background: #fff; }</style></head>
    <body>
      <img id="img" src="${dataUri}" style="display:block; width: 607px; height: 1024px;" />
    </body>
  </html>
`);

await page.waitForTimeout(500);

// Capture top 350px (HR Admin Dashboard, 4 KPI counters, Present/Absent status)
await page.screenshot({
  path: path.join(ROOT, 'public', 'assets', 'hr-dashboard-kpi.png'),
  clip: { x: 0, y: 0, width: 607, height: 350 }
});

await browser.close();
console.log('✅ hr-dashboard-kpi.png successfully generated with base64 dataUri');
