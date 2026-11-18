import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const inputPath = path.join(ROOT, 'public', 'assets', 'originals', 'device-mockup.png');
const heroDir = path.join(ROOT, 'public', 'assets', 'hero');

if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

async function processHero() {
  console.log('🔄 Processing device mockup with flood-fill transparency...');
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Buffer for RGBA
  const rgba = Buffer.alloc(width * height * 4);
  const visited = new Uint8Array(width * height);

  // Helper to check if pixel is near white
  function isNearWhite(idx) {
    const r = data[idx * channels];
    const g = data[idx * channels + 1];
    const b = data[idx * channels + 2];
    return r >= 248 && g >= 248 && b >= 248;
  }

  // Flood-fill BFS starting from all 4 boundaries
  const queue = [];
  function enqueue(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    if (isNearWhite(idx)) {
      visited[idx] = 1;
      queue.push(idx);
    }
  }

  // Enqueue outer border pixels
  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  console.log(`Flood-fill marked ${head} outer background pixels.`);

  // Build RGBA output
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    const outIdx = i * 4;
    rgba[outIdx] = r;
    rgba[outIdx + 1] = g;
    rgba[outIdx + 2] = b;

    if (visited[i]) {
      rgba[outIdx + 3] = 0; // Transparent
    } else {
      // Check if neighboring visited pixel for subtle anti-aliasing
      const x = i % width;
      const y = Math.floor(i / width);
      let borderNeighbor = false;
      if (x > 0 && visited[i - 1]) borderNeighbor = true;
      else if (x < width - 1 && visited[i + 1]) borderNeighbor = true;
      else if (y > 0 && visited[i - width]) borderNeighbor = true;
      else if (y < height - 1 && visited[i + width]) borderNeighbor = true;

      if (borderNeighbor && (r > 240 && g > 240 && b > 240)) {
        // Soft edge
        const brightness = (r + g + b) / (3 * 255);
        rgba[outIdx + 3] = Math.round((1 - (brightness - 240) / 15) * 255);
      } else {
        rgba[outIdx + 3] = 255;
      }
    }
  }

  const baseTransparent = sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    },
  });

  // Save full transparent PNG
  const pngPath = path.join(heroDir, 'device-mockup.png');
  await baseTransparent.png({ compressionLevel: 9 }).toFile(pngPath);
  console.log(`✅ Saved transparent base PNG to ${pngPath}`);

  // Generate device-mockup-2400.webp (width 2400, quality 95)
  const webp2400Path = path.join(heroDir, 'device-mockup-2400.webp');
  await baseTransparent
    .clone()
    .resize(2400, null, { kernel: 'lanczos3' })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile(webp2400Path);
  console.log(`✅ Generated ${webp2400Path} (2400px, quality 95)`);

  // Generate device-mockup-1600.webp (width 1600, quality 92)
  const webp1600Path = path.join(heroDir, 'device-mockup-1600.webp');
  await baseTransparent
    .clone()
    .resize(1600, null, { kernel: 'lanczos3' })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(webp1600Path);
  console.log(`✅ Generated ${webp1600Path} (1600px, quality 92)`);

  console.log('🎉 Slide 1 hero assets successfully generated!');
}

processHero().catch((err) => {
  console.error('❌ Error processing hero mockup:', err);
  process.exit(1);
});
