import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import Header from '../View';

describe('Header', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <Header username="John doe" />
      </JestProviders>,
    );

    expect(getByText('Olá John doe')).toBeTruthy();
  });
});
