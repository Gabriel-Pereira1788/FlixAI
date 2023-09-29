import React from 'react';
import {Text} from 'react-native';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {WrapperAuthScreen} from '../View';

describe('WrapperAuthScreen', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <WrapperAuthScreen title="John doe">
          <Text>Some children</Text>
        </WrapperAuthScreen>
      </JestProviders>,
    );

    expect(getByText('John doe')).toBeTruthy();
    expect(getByText('Some children')).toBeTruthy();
  });
});
