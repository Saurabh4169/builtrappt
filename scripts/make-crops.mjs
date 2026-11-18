import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const cropsConfigPath = path.join(ROOT, 'src', 'data', 'crops.json');
const cropsDir = path.join(ROOT, 'public', 'assets', 'crops');

if (!fs.existsSync(cropsDir)) {
  fs.mkdirSync(cropsDir, { recursive: true });
}

if (!fs.existsSync(cropsConfigPath)) {
  console.error(`❌ Config not found at ${cropsConfigPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(cropsConfigPath, 'utf8'));

console.log('🔄 Generating lossless 21:10 crops from originals...');

let generatedCount = 0;

for (const [slug, item] of Object.entries(config)) {
  const sourcePath = path.join(ROOT, item.source);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️ Source file not found for "${slug}": ${sourcePath}. Skipping.`);
    continue;
  }

  try {
    const meta = await sharp(sourcePath).metadata();
    const origW = meta.width;
    const origH = meta.height;

    const x = Math.max(0, Math.min(item.x || 0, origW - 10));
    const y = Math.max(0, Math.min(item.y || 0, origH - 10));

    // Target crop size
    const targetW = Math.min(item.w || 1024, origW - x);
    const targetH = Math.min(item.h || 488, origH - y);

    let pipeline = sharp(sourcePath).extract({
      left: x,
      top: y,
      width: targetW,
      height: targetH,
    });

    const outPath = path.join(cropsDir, `${slug}.png`);
    await pipeline
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outPath);

    // Also write @2x version for high-density sharp displays
    const out2xPath = path.join(cropsDir, `${slug}@2x.png`);
    await sharp(outPath)
      .resize(targetW * 2, targetH * 2, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(out2xPath);

    console.log(`✅ [21:10] ${slug}.png (${targetW}×${targetH}) and ${slug}@2x.png (${targetW*2}×${targetH*2}) generated`);
    generatedCount++;
  } catch (err) {
    console.error(`❌ Failed cropping ${slug}:`, err.message);
  }
}

console.log(`🎉 Finished! Successfully generated ${generatedCount} 21:10 crops in public/assets/crops/`);
