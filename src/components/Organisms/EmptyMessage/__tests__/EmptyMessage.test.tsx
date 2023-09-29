import React from 'react';
import {Text} from 'react-native';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {EmptyMessage} from '../EmptyMessage';

describe('EmptyMessage', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <EmptyMessage message="Teste">
          <Text>Message 2</Text>
        </EmptyMessage>
      </JestProviders>,
    );

    expect(getByText('Teste')).toBeTruthy();
    expect(getByText('Message 2')).toBeTruthy();
  });
});
