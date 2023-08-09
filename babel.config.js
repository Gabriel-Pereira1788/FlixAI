module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@components': './src/components',
          '@components/organisms': './src/components/Organisms',
          '@components/atoms': './src/components/Atoms',
          '@components/molecules': './src/components/Molecules',
          '@api': './src/repositories/api',
          '@database': './src/repositories/database',
          '@domain': './src/repositories/domain',
          '@utils': './src/helpers/utils',
          '@constants': './src/helpers/constants',
          '@models': './src/models',
          '@store': './src/store',
          '@hooks': './src/helpers/hooks',
          '@styles': './src/styles',
          '@screens': './src/screens',
          '@mocks': './mocks',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
