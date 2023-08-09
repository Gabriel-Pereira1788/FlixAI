import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import Loading from '../View';

describe('Loading', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Loading typeLoading="IA" />
      </JestProviders>,
    );
    expect(getByTestId('main-image')).toBeTruthy();
  });

  it('render component with typeloading simple', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Loading typeLoading="simple" />
      </JestProviders>,
    );
    expect(getByTestId('movie-image')).toBeTruthy();
  });
});
