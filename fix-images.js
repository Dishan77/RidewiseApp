// Script to fix problematic image files before Expo build
const fs = require('fs');
const path = require('path');

console.log('Starting image fix script...');

// List of problematic image files
const imagesToFix = [
  './assets/images/favicon.png',
  './assets/images/icon.png'
];

// Function to check if a file is a valid PNG
function isValidPng(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    // Check PNG signature (first 8 bytes)
    return fileData.length > 8 && 
           fileData[0] === 0x89 && 
           fileData[1] === 0x50 && 
           fileData[2] === 0x4E && 
           fileData[3] === 0x47;
  } catch (error) {
    console.error(`Error checking PNG file ${filePath}:`, error);
    return false;
  }
}

// Backup and replace problematic images with the working ridewiseLogo.png
for (const imagePath of imagesToFix) {
  const fullPath = path.resolve(__dirname, imagePath);
  
  // Check if file exists
  if (fs.existsSync(fullPath)) {
    // Check if it's a valid PNG
    if (!isValidPng(fullPath)) {
      console.log(`Found invalid PNG file: ${imagePath}`);
      
      // Create backup
      const backupPath = `${fullPath}.bak`;
      try {
        fs.copyFileSync(fullPath, backupPath);
        console.log(`Backed up ${imagePath} to ${backupPath}`);
        
        // Replace with working logo
        const workingLogo = path.resolve(__dirname, './assets/images/ridewiseLogo.png');
        if (fs.existsSync(workingLogo) && isValidPng(workingLogo)) {
          fs.copyFileSync(workingLogo, fullPath);
          console.log(`Replaced ${imagePath} with working logo`);
        } else {
          console.log('Working logo not found or invalid');
          
          // Create a simple valid PNG as fallback
          // This is a minimal valid PNG (1x1 transparent pixel)
          const minimalPng = Buffer.from([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 
            0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 
            0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00, 
            0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 
            0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 
            0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
          ]);
          
          fs.writeFileSync(fullPath, minimalPng);
          console.log(`Created minimal valid PNG for ${imagePath}`);
        }
      } catch (error) {
        console.error(`Error fixing ${imagePath}:`, error);
      }
    } else {
      console.log(`Image file is valid: ${imagePath}`);
    }
  } else {
    console.log(`Image file does not exist: ${imagePath}`);
    
    // Create directory if needed
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    
    // Copy the working logo or create minimal PNG
    const workingLogo = path.resolve(__dirname, './assets/images/ridewiseLogo.png');
    if (fs.existsSync(workingLogo) && isValidPng(workingLogo)) {
      fs.copyFileSync(workingLogo, fullPath);
      console.log(`Created ${imagePath} from working logo`);
    } else {
      // Create a minimal valid PNG
      const minimalPng = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00, 
        0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 
        0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ]);
      
      fs.writeFileSync(fullPath, minimalPng);
      console.log(`Created minimal valid PNG for ${imagePath}`);
    }
  }
}

console.log('Image fix script completed.');
