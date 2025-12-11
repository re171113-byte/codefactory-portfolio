// PWA 아이콘 생성 스크립트
// Node.js Canvas를 사용하여 아이콘 생성
// 실행: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// SVG 아이콘 템플릿 (CF 로고)
const generateSvgIcon = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#0F0F1A"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="bold" font-size="${size * 0.35}"
        fill="url(#grad)">CF</text>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// 디렉토리 생성
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG 아이콘 생성 (PNG 대신 SVG 사용)
sizes.forEach(size => {
  const svg = generateSvgIcon(size);
  const filePath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: icon-${size}x${size}.svg`);
});

// favicon.ico 대신 사용할 SVG
const faviconSvg = generateSvgIcon(32);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), faviconSvg);
console.log('Created: favicon.svg');

// Apple touch icon
const appleTouchIcon = generateSvgIcon(180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), appleTouchIcon);
console.log('Created: apple-touch-icon.svg');

console.log('\nIcon generation complete!');
console.log('Note: For production, convert SVGs to PNGs using a tool like Sharp or Inkscape.');
