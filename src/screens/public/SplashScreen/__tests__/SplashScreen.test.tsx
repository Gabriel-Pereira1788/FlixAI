import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import SplashScreen from '../View';

describe('SplashScreen', () => {
  it('render component', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SplashScreen />
      </JestProviders>,
    );

    expect(getByTestId('main-image')).toBeTruthy();
  });
});
