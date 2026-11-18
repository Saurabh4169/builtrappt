import PptxGenJS from 'pptxgenjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Read consolidated 10 slides content
const rawSlides = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'slidesContent.json'), 'utf8')
);

// ─── Design constants ───────────────────────────────────────────────────────
const C = {
  navy:      '0B1F4B',
  royal:     '1D4ED8',
  brand:     'EF144E', // Extracted dominant logo color
  grey:      '64748B',
  lightGrey: '94A3B8',
  border:    'E2E8F0',
  cardFill:  'FFFFFF',
  subCardBg: 'F8FAFC',
  chipBg:    'EFF6FF',
  chipBorder:'DBEAFE',
  white:     'FFFFFF',
};

const W = 13.33;  // inches (16:9 widescreen)
const H = 7.5;
const ML = 0.9;   // margin left (~96px equivalent)
const MT = 0.55;  // margin top (~76px equivalent)
const CW = W - ML * 2; // 11.53 inches content width

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33" × 7.5"

const builtraaLogoPath = path.join(ROOT, 'public', 'assets', 'logo.png');
const uxdlabLogoPath = path.join(ROOT, 'public', 'assets', 'uxdlab-logo.png');
const heroMockupPath = path.join(ROOT, 'public', 'assets', 'hero', 'device-mockup.png');

// ─── Header Helper ──────────────────────────────────────────────────────────
function addSlideHeader(slide, eyebrowText, titleNavy, titleBrand, titleNavyAfter, intro) {
  // Eyebrow
  slide.addText(eyebrowText.toUpperCase(), {
    x: ML, y: MT, w: 8.0, h: 0.20,
    fontSize: 9.5, bold: true, color: C.brand, fontFace: 'Calibri',
  });

  // 56px (~0.6 inch) line under eyebrow
  slide.addShape(pptx.ShapeType.rect, {
    x: ML, y: MT + 0.22, w: 0.6, h: 0.025,
    fill: { color: C.brand }, line: { type: 'none' },
  });

  // Title: 24pt bold navy + brand highlight
  const titleParts = [];
  if (titleNavy) {
    titleParts.push({ text: titleNavy + ' ', options: { color: C.navy, bold: true } });
  }
  if (titleBrand) {
    titleParts.push({ text: titleBrand + (titleNavyAfter ? ' ' : ''), options: { color: C.brand, bold: true } });
  }
  if (titleNavyAfter) {
    titleParts.push({ text: titleNavyAfter, options: { color: C.navy, bold: true } });
  }

  slide.addText(titleParts, {
    x: ML, y: MT + 0.28, w: 9.2, h: 0.44,
    fontSize: 24, fontFace: 'Calibri',
  });

  if (intro) {
    slide.addText(intro, {
      x: ML, y: MT + 0.74, w: 9.5, h: 0.24,
      fontSize: 11.5, color: C.grey, fontFace: 'Calibri',
    });
  }

  // Top Right Brand Logo Bar (Larger logos, borderless clean integration)
  const logoX = 10.45;
  const logoY = MT + 0.02;
  if (fs.existsSync(builtraaLogoPath)) {
    slide.addImage({
      path: builtraaLogoPath,
      x: logoX,
      y: logoY,
      w: 1.45,
      h: 0.36,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: logoX + 1.55,
    y: logoY + 0.03,
    w: 0,
    h: 0.28,
    line: { color: 'CBD5E1', pt: 0.75 },
  });
  if (fs.existsSync(uxdlabLogoPath)) {
    slide.addImage({
      path: uxdlabLogoPath,
      x: logoX + 1.68,
      y: logoY + 0.04,
      w: 0.95,
      h: 0.28,
    });
  }
}

// ─── Module Card Renderer (Precise, Sleek, Uncongested Layout) ───────────────
function addModuleCard(slide, x, y, w, h, moduleData) {
  if (!moduleData) return;

  // 1. Column Card Container (PURE WHITE, NO GRADIENTS)
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.16,
    fill: { color: C.cardFill },
    line: { color: C.border, pt: 0.75 },
    shadow: { type: 'outer', blur: 6, offset: 3, angle: 90, color: '0B1F4B', opacity: 0.04 },
  });

  // 2. Left Brand Line
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.04, h,
    fill: { color: C.brand }, line: { type: 'none' },
  });

  // 3. Header: Icon Chip + Title + Tagline (~0.44" height)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18, y: y + 0.12, w: 0.34, h: 0.34, rectRadius: 0.08,
    fill: { color: C.chipBg }, line: { color: C.chipBorder, pt: 0.5 },
  });
  slide.addText(moduleData.name.charAt(0), {
    x: x + 0.18, y: y + 0.12, w: 0.34, h: 0.34,
    fontSize: 11, bold: true, color: C.royal, fontFace: 'Calibri', align: 'center', valign: 'middle',
  });

  // Title: 24px / ~13pt bold
  slide.addText(moduleData.name, {
    x: x + 0.60, y: y + 0.08, w: w - 0.78, h: 0.22,
    fontSize: 13, bold: true, color: C.navy, fontFace: 'Calibri',
  });

  // Tagline: 14px / ~8.5pt regular
  slide.addText(moduleData.tagline, {
    x: x + 0.60, y: y + 0.28, w: w - 0.78, h: 0.18,
    fontSize: 8.5, color: C.grey, fontFace: 'Calibri',
  });

  // 4. 21:10 Screenshot Frame (Aspect Ratio 21:10 = 2.1)
  const containerY = y + 0.50;
  const containerW = w - 0.36; // 5.19 inches
  const containerH = 2.47;     // 5.19 / 2.1 = 2.47 inches (exact 21:10 ratio)

  // Browser Container Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18, y: containerY, w: containerW, h: containerH, rectRadius: 0.08,
    fill: { color: 'FFFFFF' },
    line: { color: C.border, pt: 0.75 },
  });

  // Browser Top Bar (max 22px equivalent ~ 0.15")
  const topBarH = 0.15;
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.18, y: containerY, w: containerW, h: topBarH,
    fill: { color: 'F1F5F9' },
    line: { color: C.border, pt: 0.5 },
  });

  // 3 Browser window dots (red, yellow, green)
  const dotY = containerY + 0.04;
  const dotR = 0.045;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.25, y: dotY, w: dotR, h: dotR,
    fill: { color: 'EF4444' }, line: { type: 'none' },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.33, y: dotY, w: dotR, h: dotR,
    fill: { color: 'F59E0B' }, line: { type: 'none' },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.41, y: dotY, w: dotR, h: dotR,
    fill: { color: '10B981' }, line: { type: 'none' },
  });

  // Browser title text
  slide.addText(`Builtraa · ${moduleData.name}`, {
    x: x + 0.52, y: containerY, w: containerW - 0.65, h: topBarH,
    fontSize: 7, color: C.lightGrey, fontFace: 'Calibri', valign: 'middle',
  });

  // Inner Image Area
  const imgY = containerY + topBarH;
  const imgW = containerW;
  const imgH = containerH - topBarH;

  if (moduleData.image) {
    const relPath = moduleData.image.replace(/^\//, '');
    const imgFullPath = path.join(ROOT, 'public', relPath);
    if (fs.existsSync(imgFullPath)) {
      slide.addImage({
        path: imgFullPath,
        x: x + 0.18,
        y: imgY,
        w: imgW,
        h: imgH,
      });
    }
  } else {
    // Clean glass placeholder for modules without screenshot
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.22, y: imgY + 0.08, w: imgW - 0.08, h: imgH - 0.16, rectRadius: 0.06,
      fill: { color: 'F8FAFC' },
      line: { color: 'CBD5E1', dashType: 'dash', pt: 1 },
    });

    slide.addText([
      { text: `${moduleData.name}\n`, options: { bold: true, color: C.navy, fontSize: 11 } },
      { text: 'Screenshot coming soon', options: { bold: false, color: C.grey, fontSize: 9 } },
    ], {
      x: x + 0.25, y: imgY + 0.5, w: imgW - 0.14, h: 1.0,
      fontFace: 'Calibri', align: 'center', valign: 'middle',
    });
  }

  // 5. 3 Stacked Mini Feature Cards (Precise & Sleek: height 0.40" each, increased spacing)
  const cardStartY = containerY + containerH + 0.12;
  const miniCardH = 0.40;
  const miniCardGap = 0.09;

  moduleData.bullets.forEach((b, idx) => {
    const cy = cardStartY + idx * (miniCardH + miniCardGap);

    // Mini card container
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.18, y: cy, w: containerW, h: miniCardH, rectRadius: 0.08,
      fill: { color: C.subCardBg },
      line: { color: C.border, pt: 0.75 },
    });

    // 3px Brand line on the left of mini card
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.18, y: cy, w: 0.035, h: miniCardH,
      fill: { color: C.brand }, line: { type: 'none' },
    });

    // 0.26" Icon chip on the left
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.26, y: cy + 0.07, w: 0.26, h: 0.26, rectRadius: 0.05,
      fill: { color: C.brand }, line: { type: 'none' },
    });
    slide.addText(b.label.charAt(0), {
      x: x + 0.26, y: cy + 0.07, w: 0.26, h: 0.26,
      fontSize: 8.5, bold: true, color: C.white, fontFace: 'Calibri', align: 'center', valign: 'middle',
    });

    // Two lines of text: Title 9pt bold navy, text 7.5pt regular grey
    slide.addText([
      { text: `${b.label}\n`, options: { bold: true, color: C.navy, fontSize: 9 } },
      { text: b.desc, options: { bold: false, color: C.grey, fontSize: 7.5 } },
    ], {
      x: x + 0.58, y: cy + 0.03, w: containerW - 0.65, h: miniCardH - 0.06,
      fontFace: 'Calibri', valign: 'middle',
    });
  });

  // 6. Steps in STRICTLY ONE HORIZONTAL ROW
  const footerStartY = cardStartY + 3 * (miniCardH + miniCardGap) + 0.08;

  // Steps chips (ONE single horizontal row)
  const stepCount = moduleData.steps.length;
  const stepColW = (containerW - 0.60) / stepCount;

  slide.addText('STEPS: ', {
    x: x + 0.18, y: footerStartY, w: 0.50, h: 0.20,
    fontSize: 7, bold: true, color: C.brand, fontFace: 'Calibri', valign: 'middle',
  });

  moduleData.steps.forEach((st, sIdx) => {
    const sx = x + 0.68 + sIdx * stepColW;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: sx, y: footerStartY, w: stepColW - 0.05, h: 0.20, rectRadius: 0.10,
      fill: { color: 'F8FAFC' }, line: { color: 'E2E8F0', pt: 0.5 },
    });
    // Step number
    slide.addShape(pptx.ShapeType.ellipse, {
      x: sx + 0.02, y: footerStartY + 0.03, w: 0.14, h: 0.14,
      fill: { color: sIdx === 0 ? C.brand : 'CBD5E1' }, line: { type: 'none' },
    });
    slide.addText(String(sIdx + 1), {
      x: sx + 0.02, y: footerStartY + 0.03, w: 0.14, h: 0.14,
      fontSize: 6.5, bold: true, color: sIdx === 0 ? C.white : C.navy,
      fontFace: 'Calibri', align: 'center', valign: 'middle',
    });
    // Step label
    slide.addText(st, {
      x: sx + 0.18, y: footerStartY, w: stepColW - 0.22, h: 0.20,
      fontSize: 6.8, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle',
    });
  });

  // "Why it helps" strip (height: 0.26", fill: EFF6FF, line: DBEAFE)
  const whyY = footerStartY + 0.25;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18, y: whyY, w: containerW, h: 0.26, rectRadius: 0.06,
    fill: { color: C.chipBg }, line: { color: C.chipBorder, pt: 0.5 },
  });

  slide.addText([
    { text: '✓  Why it helps: ', options: { bold: true, color: C.royal, fontSize: 8 } },
    { text: moduleData.whyItHelps, options: { bold: false, color: C.navy, fontSize: 8 } },
  ], {
    x: x + 0.26, y: whyY, w: containerW - 0.16, h: 0.26,
    fontFace: 'Calibri', valign: 'middle',
  });
}

// ─── Slide 1: Cover Slide with Hero Laptop + Phone Mockup ───────────────────
function buildSlide1(slideData) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };

  // Top 3px brand line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: W * 0.1, h: 0.04,
    fill: { color: C.brand }, line: { type: 'none' },
  });

  // Top Right Logo Bar
  const logoX = 10.65;
  const logoY = 0.55;
  if (fs.existsSync(builtraaLogoPath)) {
    slide.addImage({
      path: builtraaLogoPath,
      x: logoX,
      y: logoY,
      w: 1.15,
      h: 0.28,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: logoX + 1.25,
    y: logoY + 0.02,
    w: 0,
    h: 0.24,
    line: { color: 'CBD5E1', pt: 0.75 },
  });
  if (fs.existsSync(uxdlabLogoPath)) {
    slide.addImage({
      path: uxdlabLogoPath,
      x: logoX + 1.35,
      y: logoY + 0.03,
      w: 0.75,
      h: 0.22,
    });
  }

  // Eyebrow
  slide.addText('HR MANAGEMENT SYSTEM', {
    x: ML, y: 1.5, w: 6.5, h: 0.24,
    fontSize: 10, bold: true, color: C.brand, fontFace: 'Calibri',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: ML, y: 1.76, w: 0.6, h: 0.025,
    fill: { color: C.brand }, line: { type: 'none' },
  });

  // Main Title: "One platform for people, time and pay."
  slide.addText([
    { text: 'One platform for\n', options: { color: C.navy, bold: true, fontSize: 38 } },
    { text: 'people, time\n', options: { color: C.brand, bold: true, fontSize: 38 } },
    { text: 'and pay.', options: { color: C.navy, bold: true, fontSize: 38 } },
  ], {
    x: ML, y: 2.0, w: 6.2, h: 2.3,
    fontFace: 'Calibri', lineSpacing: 42,
  });

  // Subtitle
  slide.addText(slideData.intro, {
    x: ML, y: 4.5, w: 5.8, h: 0.35,
    fontSize: 13.5, color: C.grey, fontFace: 'Calibri',
  });

  // "Explore Presentation →" button
  slide.addShape(pptx.ShapeType.roundRect, {
    x: ML, y: 5.15, w: 2.5, h: 0.5, rectRadius: 0.25,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
    shadow: { type: 'outer', blur: 6, offset: 3, angle: 90, color: '0B1F4B', opacity: 0.06 },
  });
  slide.addText('Explore Presentation  →', {
    x: ML, y: 5.15, w: 2.5, h: 0.5,
    fontSize: 12, bold: true, color: C.navy, fontFace: 'Calibri', align: 'center',
  });

  // Right Side: Hero Laptop + Mobile Mockup (Reduced balanced size, sharp and static)
  if (fs.existsSync(heroMockupPath)) {
    // Shadow under laptop base
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 7.5, y: 5.10, w: 4.2, h: 0.20,
      fill: { color: '0F172A' },
      line: { type: 'none' },
    });

    // Mockup image
    slide.addImage({
      path: heroMockupPath,
      x: 7.2,
      y: 1.80,
      w: 4.8,
      h: 3.16,
    });
  }

  // Bottom Marquee Strip of 17 Modules
  slide.addShape(pptx.ShapeType.line, {
    x: ML, y: 6.35, w: CW, h: 0,
    line: { color: C.border, pt: 0.75 },
  });
  const modulesList = [
    '01 HR Dashboard', '02 Employees', '03 Attendance', '04 Leave',
    '05 Payroll', '06 Loan', '07 Increment', '08 Discrepancy',
  ];
  const chipW = 1.35;
  const chipH = 0.32;
  modulesList.forEach((mod, i) => {
    const cx = ML + i * (chipW + 0.1);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx, y: 6.5, w: chipW, h: chipH, rectRadius: 0.16,
      fill: { color: C.white }, line: { color: C.border, pt: 0.5 },
    });
    slide.addText(mod, {
      x: cx, y: 6.5, w: chipW, h: chipH,
      fontSize: 8.5, bold: true, color: C.navy, fontFace: 'Calibri', align: 'center',
    });
  });

  if (slideData.speakerNotes) {
    slide.addNotes(slideData.speakerNotes);
  }
}

// ─── Slide 2: Overview (What This System Covers) ────────────────────────────
function buildOverviewSlide(slideData) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };

  addSlideHeader(slide, slideData.eyebrow, slideData.titleNavy, slideData.titleBrand, slideData.titleNavyAfter, slideData.intro);

  const cardY = 1.68;
  const cardW = 2.70;
  const cardH = 5.15;
  const gap = 0.24;

  (slideData.categories || []).forEach((cat, cIdx) => {
    const cx = ML + cIdx * (cardW + gap);

    // Card container
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx, y: cardY, w: cardW, h: cardH, rectRadius: 0.16,
      fill: { color: C.cardFill },
      line: { color: C.border, pt: 0.75 },
      shadow: { type: 'outer', blur: 6, offset: 3, angle: 90, color: '0B1F4B', opacity: 0.04 },
    });

    // Category Header chip
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx + 0.18, y: cardY + 0.18, w: 0.36, h: 0.36, rectRadius: 0.08,
      fill: { color: C.chipBg }, line: { color: C.chipBorder, pt: 0.5 },
    });
    slide.addText(cat.title.charAt(0), {
      x: cx + 0.18, y: cardY + 0.18, w: 0.36, h: 0.36,
      fontSize: 12, bold: true, color: cIdx === 0 || cIdx === 1 ? C.brand : C.royal, fontFace: 'Calibri', align: 'center', valign: 'middle',
    });

    // Category title
    slide.addText(cat.title, {
      x: cx + 0.62, y: cardY + 0.16, w: cardW - 0.76, h: 0.38,
      fontSize: 13, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle',
    });

    // Divider line
    slide.addShape(pptx.ShapeType.line, {
      x: cx + 0.18, y: cardY + 0.62, w: cardW - 0.36, h: 0,
      line: { color: C.border, pt: 0.5 },
    });

    // Section chips
    const startSecY = cardY + 0.74;
    const secChipH = 0.44;
    const secGap = 0.14;
    (cat.sections || []).forEach((sec, sIdx) => {
      const sy = startSecY + sIdx * (secChipH + secGap);

      // Section pill
      slide.addShape(pptx.ShapeType.roundRect, {
        x: cx + 0.14, y: sy, w: cardW - 0.28, h: secChipH, rectRadius: 0.10,
        fill: { color: C.subCardBg }, line: { color: C.border, pt: 0.5 },
      });

      // Section name
      slide.addText(sec.name, {
        x: cx + 0.24, y: sy, w: cardW - 0.95, h: secChipH,
        fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle',
      });

      // Target slide badge
      const badgeNum = String(sec.slide).padStart(2, '0');
      slide.addShape(pptx.ShapeType.roundRect, {
        x: cx + cardW - 0.68, y: sy + 0.08, w: 0.44, h: 0.28, rectRadius: 0.14,
        fill: { color: C.chipBg }, line: { color: C.chipBorder, pt: 0.5 },
      });
      slide.addText(badgeNum, {
        x: cx + cardW - 0.68, y: sy + 0.08, w: 0.44, h: 0.28,
        fontSize: 9, bold: true, color: C.brand, fontFace: 'Calibri', align: 'center', valign: 'middle',
      });
    });
  });

  // Bottom Hint
  slide.addText('Click any section above to jump directly to its slide.', {
    x: ML, y: cardY + cardH + 0.10, w: 6.0, h: 0.28,
    fontSize: 10, color: C.grey, fontFace: 'Calibri', valign: 'middle',
  });
  slide.addText('Next: HR Dashboard & Employees (Slide 03) →', {
    x: ML + CW - 4.5, y: cardY + cardH + 0.10, w: 4.5, h: 0.28,
    fontSize: 10, bold: true, color: C.brand, fontFace: 'Calibri', align: 'right', valign: 'middle',
  });

  if (slideData.speakerNotes) {
    slide.addNotes(slideData.speakerNotes);
  }
}

// ─── Slides 3 to 11: 2-Column Module Slides ─────────────────────────────────
function buildTwoColumnSlide(slideData) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white }; // PURE SOLID WHITE, NO GRADIENT

  // Header
  addSlideHeader(slide, slideData.eyebrow, slideData.titleNavy, slideData.titleBrand, slideData.titleNavyAfter, slideData.intro);

  const colY = 1.72;
  const colW = 5.55;
  const colH = 5.35;
  const gap = 0.43;
  const rightX = ML + colW + gap;

  // Left Column Card
  addModuleCard(slide, ML, colY, colW, colH, slideData.moduleLeft);

  // Right Column Card
  addModuleCard(slide, rightX, colY, colW, colH, slideData.moduleRight);

  // Speaker notes
  if (slideData.speakerNotes) {
    slide.addNotes(slideData.speakerNotes);
  }
}

// ─── Build All 11 Slides ────────────────────────────────────────────────────
console.log('Generating optimized 11-slide PowerPoint deck with Overview slide, precise mini cards and single-row steps...');

for (const slideData of rawSlides) {
  if (slideData.type === 'cover') {
    buildSlide1(slideData);
  } else if (slideData.type === 'overview') {
    buildOverviewSlide(slideData);
  } else if (slideData.type === 'two_column') {
    buildTwoColumnSlide(slideData);
  }
}

// Ensure exports directory exists
const exportDir = path.join(ROOT, 'exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

const outputPath = path.join(exportDir, 'Builtraa_HR_Management_v3.pptx');
await pptx.writeFile({ fileName: outputPath });

console.log(`✅ PPTX successfully exported to: ${outputPath} (11 slides)`);
