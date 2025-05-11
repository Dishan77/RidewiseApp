// Simple script to fix corrupted PNG files for Expo web build
const fs = require('fs');
const path = require('path');

console.log('Fixing image files for Expo build...');

// Create valid PNG files for icons
const assets = path.resolve(__dirname, 'assets/images');
if (!fs.existsSync(assets)) {
  fs.mkdirSync(assets, { recursive: true });
}

// Valid 1x1 transparent PNG file (hex data)
const validPngData = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
  0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
  0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
]);

// Fix the problematic files
const filesToFix = [
  path.join(assets, 'icon.png'),
  path.join(assets, 'favicon.png')
];

for (const file of filesToFix) {
  // Check if file exists and if it's not a valid PNG
  let needsFix = true;
  if (fs.existsSync(file)) {
    try {
      const data = fs.readFileSync(file);
      // Check PNG signature
      if (data.length > 8 &&
          data[0] === 0x89 && data[1] === 0x50 && 
          data[2] === 0x4E && data[3] === 0x47) {
        console.log(`File ${file} is already a valid PNG.`);
        needsFix = false;
      }
    } catch (err) {
      console.log(`Error reading ${file}: ${err.message}`);
    }
  }
  
  if (needsFix) {
    try {
      console.log(`Fixing ${file}...`);
      fs.writeFileSync(file, validPngData);
      console.log(`Created valid PNG file: ${file}`);
    } catch (err) {
      console.error(`Failed to fix ${file}: ${err.message}`);
    }
  }
}

console.log('Image fix completed.');
