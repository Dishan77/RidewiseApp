// Direct build script that creates a static landing page without Expo
const fs = require('fs');
const path = require('path');

console.log('Starting direct build script...');

// Create dist directory
const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create assets directory
const assetsDir = path.resolve(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Instead of copying images, create a simple SVG logo
const svgLogo = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="30" fill="#3371FF"/>
  <path d="M50 100 L90 70 L90 130 Z" fill="white"/>
  <path d="M95 70 L135 70 L135 130 L95 130 Z" fill="white"/>
  <path d="M140 70 L140 130 L180 100 Z" fill="white"/>
</svg>`;

fs.writeFileSync(path.resolve(assetsDir, 'logo.svg'), svgLogo);
console.log('Created SVG logo');

// Create a static HTML landing page
const landingPage = `<!DOCTYPE html>
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
    <img src="./assets/logo.svg" alt="RideWise Logo" class="logo">
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
</html>`;

fs.writeFileSync(path.resolve(distDir, 'index.html'), landingPage);
console.log('Created landing page');

// Create a very simple 404 page
const notFoundPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - RideWise App</title>
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
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    .container {
      max-width: 500px;
      padding: 2rem;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #3371FF;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    a {
      color: #3371FF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Page not found</p>
    <p><a href="/">Return to home page</a></p>
  </div>
</body>
</html>`;

fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundPage);
console.log('Created 404 page');

// Create a simple robots.txt
fs.writeFileSync(path.resolve(distDir, 'robots.txt'), 'User-agent: *\nAllow: /');

// Create a minimal manifest.json
const manifest = {
  "name": "RideWise",
  "short_name": "RideWise",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#3371FF",
  "icons": [
    {
      "src": "./assets/logo.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
};

fs.writeFileSync(
  path.resolve(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Build completed successfully - files created:');
console.log('- index.html');
console.log('- 404.html');
console.log('- robots.txt');
console.log('- manifest.json');
console.log('- assets/logo.svg');
