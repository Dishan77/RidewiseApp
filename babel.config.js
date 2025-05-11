module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add support for native modules
      'expo-router/babel',
      // Reanimated plugin is placed at the end
      'react-native-reanimated/plugin',
    ],
  };
};
