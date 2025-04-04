const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

// Get the default config
const defaultConfig = getDefaultConfig(__dirname);

// Add 'cjs' extension to the source extensions as you already had
defaultConfig.resolver.sourceExts.push('cjs');

// Add watchFolders configuration to limit what's being watched
defaultConfig.watchFolders = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'navigation'),
  path.resolve(__dirname, 'screens')
];

// Configure blacklist to exclude watching unnecessary node_modules
defaultConfig.resolver.blacklistRE = [
  /node_modules\/.*\/node_modules\/(?!react-native|@react-native|expo|@expo).*/,
];

module.exports = defaultConfig;