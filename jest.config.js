module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|react-navigation|react-redux|expo|@expo|expo-modules-core)/",
  ]
};