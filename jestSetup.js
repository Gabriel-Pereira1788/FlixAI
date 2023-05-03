import 'react-native-gesture-handler/jestSetup';
export const mockedNavigate = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

// jest.mock('react-native-vector-icons/Ionicons', () =>
//   require('react-native-vector-icons'),
// );

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
      };
    },
  };
});

// jest.mock('react-native-image-picker', () => {
//   return {
//     launchCamera: jest.fn(),
//     launchImageLibrary: jest.fn(),
//   };
// });

// jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
