// Custom build script that completely skips the Expo export
const fs = require('fs');
const path = require('path');

console.log('Starting direct web build script...');

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true });
}

// Create assets directory in dist
const assetsDir = path.resolve(__dirname, 'dist/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Try to copy the logo file to assets directory
try {
  console.log('Copying logo file...');
  fs.copyFileSync(
    path.resolve(__dirname, 'assets/images/ridewiseLogo.png'),
    path.resolve(assetsDir, 'logo.png')
  );
  console.log('Logo copied successfully');
} catch (error) {
  console.error('Failed to copy logo:', error);
  // Create a fallback image with base64 encoding
  const fallbackImageDir = path.resolve(__dirname, 'dist/fallback');
  if (!fs.existsSync(fallbackImageDir)) {
    fs.mkdirSync(fallbackImageDir, { recursive: true });
  }
}

// Create a static landing page
console.log('Creating landing page...');
const landingPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RideWise App</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #121212;
      color: #fff;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .logo {
      width: 120px;
      height: 120px;
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #3371FF, #5C6BC0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin-bottom: 2rem;
      color: #ccc;
    }
    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
    }
    .feature {
      background-color: #1e1e1e;
      border-radius: 12px;
      padding: 1.5rem;
      width: 300px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .feature h3 {
      margin-bottom: 0.5rem;
      color: #3371FF;
    }
    .cta-button {
      background: linear-gradient(90deg, #3371FF, #5C6BC0);
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
      text-decoration: none;
      display: inline-block;
    }
    .footer {
      margin-top: 3rem;
      font-size: 0.9rem;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="./assets/logo.png" alt="RideWise Logo" class="logo" onerror="this.onerror=null; this.src='https://via.placeholder.com/120x120/3371FF/FFFFFF?text=RW'; this.alt='RideWise'">
    <h1>RideWise</h1>
    <p>Compare ride prices across multiple services in real-time and find the best deal for your journey.</p>
    
    <div class="features">
      <div class="feature">
        <h3>Price Comparison</h3>
        <p>Compare prices from different ride services to find the best deal.</p>
      </div>
      <div class="feature">
        <h3>Real-time Data</h3>
        <p>Get up-to-date information on ride availability and pricing.</p>
      </div>
      <div class="feature">
        <h3>Easy Navigation</h3>
        <p>Simple interface to quickly find and book your preferred ride.</p>
      </div>
    </div>
    
    <a href="#" class="cta-button">Download the App</a>
    
    <div class="footer">
      &copy; 2025 RideWise. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.resolve(__dirname, 'dist/index.html'), landingPage);
console.log('Landing page created successfully');

// Create a simple robots.txt
fs.writeFileSync(path.resolve(__dirname, 'dist/robots.txt'), 'User-agent: *\nAllow: /');

// Create a basic manifest file
const manifest = {
  "name": "RideWise",
  "short_name": "RideWise",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#3371FF",
  "icons": [
    {
      "src": "./assets/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
};

fs.writeFileSync(
  path.resolve(__dirname, 'dist/manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Build completed successfully!');

