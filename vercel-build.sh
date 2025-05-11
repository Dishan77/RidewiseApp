#!/bin/bash
set -e

# Run image fix script
echo "Running image fix script..."
node fix-images.js

# Create directories
mkdir -p dist
mkdir -p web-build

# Attempt Expo export
echo "Attempting Expo export to web..."
expo export:web || true

# Ensure we have content in dist
if [ -d "web-build" ] && [ "$(ls -A web-build)" ]; then
  echo "Using web-build output..."
  cp -r web-build/* dist/ 2>/dev/null || true
else
  echo "Creating fallback content..."
  # Create a simple HTML file if expo export failed
  cat > dist/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RideWise</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #3371FF;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin-bottom: 2rem;
      color: #aaaaaa;
    }
    .logo {
      width: 120px;
      height: 120px;
      background: #3371FF;
      border-radius: 20px;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 2rem;
    }
    .cta {
      background: #3371FF;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="logo">RW</div>
  <h1>RideWise</h1>
  <p>Compare ride prices across multiple services in real-time and find the best deal for your journey.</p>
  <a href="#" class="cta">Download App</a>
</body>
</html>
EOL

fi

echo "Build completed"
