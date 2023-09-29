import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Category} from '../View';

describe('Category', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <Category text="teste" identify="teste1" currentCategory="teste2" />
      </JestProviders>,
    );
    const element = getByTestId('box');

    expect(getByText('teste')).toBeTruthy();
    expect(element.props.style[0].backgroundColor).toEqual('#1e1e2c');
  });
  it('render component correctly with current category', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <Category text="teste" identify="teste1" currentCategory="teste1" />
      </JestProviders>,
    );
    const element = getByTestId('box');

    expect(getByText('teste')).toBeTruthy();
    expect(element.props.style[0].backgroundColor).toEqual('#ffffffef');
  });
});
