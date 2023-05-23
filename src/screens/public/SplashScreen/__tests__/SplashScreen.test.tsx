import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import SplashScreen from '../View';
import {useFocusedScreen} from '../../../../helpers/hooks/useFocusedScreen';

const mockUseFocusedScreen = useFocusedScreen as jest.Mock<
  ReturnType<typeof useFocusedScreen>
>;

jest.mock('../../../../helpers/hooks/useFocusedScreen');

const navigation = {
  addListener: jest.fn(),
  replace: jest.fn(),
} as any;

const route = {} as any;
jest.useFakeTimers();
describe('SplashScreen', () => {
  beforeAll(() => {
    mockUseFocusedScreen.mockImplementation(() => ({
      focused: true,
    }));
  });
  it('render component', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SplashScreen navigation={navigation} route={route} />
      </JestProviders>,
    );

    expect(getByTestId('main-image')).toBeTruthy();
  });
});
