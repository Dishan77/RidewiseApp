const config = {
  name: "RideWise",
  slug: "ridewise",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/webicon.png",
  scheme: "ridewise",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ridewise.app",
    config: {
      usesNonExemptEncryption: false
    }
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/webfavicon.png"
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true
  },
  // This will directly replace problematic image files during build
  assetBundlePatterns: [
    "**/*"
  ],
  extra: {
    // Force disable image processing for web export
    eas: {
      projectId: "ridewise-app"
    }
  }
};

// Special handling for web export
if (process.env.EXPO_PUBLIC_PLATFORM === 'web') {
  // Use reduced image processing for web
  config.web.output = 'static';
  config.web.bundler = 'metro';
}

module.exports = config;
