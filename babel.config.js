module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx'],
        alias: {
          '@/components': './app/components',
          '@/config': './app/config',
          '@/i18n': './app/i18n',
          '@/models': './app/models',
          '@/navigators': './app/navigators',
          '@/screens': './app/screens',
          '@/services': './app/services',
          '@/theme': './app/theme',
          '@/utils': './app/utils',
        },
      },
    ],
  ],
}
