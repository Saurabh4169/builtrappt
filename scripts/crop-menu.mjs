import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const browser = await chromium.launch();
const page = await browser.newPage();
const srcFile = path.join(ROOT, 'public', 'assets', 'sidebar-1.png');
const base64Data = fs.readFileSync(srcFile).toString('base64');
const dataUri = `data:image/png;base64,${base64Data}`;

await page.setContent(`
  <!DOCTYPE html>
  <html>
    <head><style>body { margin: 0; padding: 0; background: #fff; }</style></head>
    <body>
      <img id="img" src="${dataUri}" style="display:block; width: 1024px; height: 576px;" />
    </body>
  </html>
`);

await page.waitForTimeout(500);

// In media_1794995021836_abe40caa.png, the modal box starts around x: 105, y: 40, width: 405, height: 245
await page.screenshot({
  path: path.join(ROOT, 'public', 'assets', 'sidebar-menu.png'),
  clip: { x: 106, y: 42, width: 404, height: 242 }
});

await browser.close();
console.log('✅ sidebar-menu.png generated with tight clip (404x242, aspect ratio 1.67)');
