const fs = require('fs');
const path = require('path');

let copied = 0;
for (let i = 1; i <= 240; i++) {
  const pad3 = String(i).padStart(3, '0');
  const pad4 = String(i).padStart(4, '0');
  const src = path.join(__dirname, '..', `ezgif-frame-${pad3}.jpg`);
  const dest = path.join(__dirname, '..', 'public', 'frames', 'film', `frame_${pad4}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    copied++;
  }
}
console.log(`Successfully copied ${copied} frames to public/frames/film/`);
