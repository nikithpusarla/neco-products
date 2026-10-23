import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const INPUT_DIR = path.join(ROOT_DIR, 'public', 'frames', 'film');
const DESKTOP_OUT = path.join(ROOT_DIR, 'public', 'frames', 'webp-desktop');
const MOBILE_OUT = path.join(ROOT_DIR, 'public', 'frames', 'webp-mobile');
const MANIFEST_PATH = path.join(ROOT_DIR, 'public', 'frames', 'manifest.json');

[DESKTOP_OUT, MOBILE_OUT].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function runOptimization() {
  console.log('--- Starting Frame Optimization using Sharp ---');

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .sort();

  console.log(`Found ${files.length} JPG frames in ${INPUT_DIR}`);

  const totalFrames = files.length;
  let processed = 0;

  for (let i = 0; i < totalFrames; i++) {
    const file = files[i];
    const frameNumber = i + 1;
    const padNumber = String(frameNumber).padStart(4, '0');
    const inputPath = path.join(INPUT_DIR, file);

    const desktopFile = path.join(DESKTOP_OUT, `frame_${padNumber}.webp`);
    const mobileFile = path.join(MOBILE_OUT, `frame_${padNumber}.webp`);

    // Process Desktop WebP (max width 1920, quality 72)
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 72, effort: 4 })
      .toFile(desktopFile);

    // Process Mobile WebP (max width 1080, quality 68)
    await sharp(inputPath)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 68, effort: 4 })
      .toFile(mobileFile);

    processed++;
    if (processed % 20 === 0 || processed === totalFrames) {
      console.log(`Optimized ${processed}/${totalFrames} frames...`);
    }
  }

  const manifest = {
    frameCount: totalFrames,
    fps: 30,
    aspectRatio: 16 / 9,
    desktop: {
      folder: '/frames/webp-desktop',
      filePattern: 'frame_%04d.webp',
      fallbackFolder: '/frames/film',
      fallbackPattern: 'frame_%04d.jpg',
      width: 1920,
    },
    mobile: {
      folder: '/frames/webp-mobile',
      filePattern: 'frame_%04d.webp',
      fallbackFolder: '/frames/film',
      fallbackPattern: 'frame_%04d.jpg',
      width: 1080,
    },
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Created manifest at ${MANIFEST_PATH}`);
  console.log('Frame optimization completed successfully!');
}

runOptimization().catch((err) => {
  console.error('Error during optimization:', err);
  process.exit(1);
});
