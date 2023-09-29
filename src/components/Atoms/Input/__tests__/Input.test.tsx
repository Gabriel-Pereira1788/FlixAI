import React from 'react';
import {Text} from 'react-native';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Input} from '../View';

let valueInput = '';

describe('Input', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Input />
      </JestProviders>,
    );

    const input = getByTestId('wrapperInput');
    expect(input).toBeTruthy();
  });

  it('render right element in input correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <Input rightElement={<Text>right element</Text>} />
      </JestProviders>,
    );

    const rightElement = getByText('right element');
    expect(rightElement).toBeTruthy();
  });

  it('call onChange function correctly', () => {
    const {getByPlaceholderText} = render(
      <JestProviders>
        <Input
          placeholder="teste"
          value={valueInput}
          onChangeText={text => {
            valueInput = text;
          }}
          rightElement={<Text>right element</Text>}
        />
      </JestProviders>,
    );

    const textInput = getByPlaceholderText('teste');

    fireEvent.changeText(textInput, 'John doe!');
    expect(valueInput).toEqual('John doe!');
  });

  it('secureTextEntry truthy by type password', () => {
    const {getByPlaceholderText} = render(
      <JestProviders>
        <Input
          type="password"
          placeholder="teste"
          rightElement={<Text>right element</Text>}
        />
      </JestProviders>,
    );

    const textInput = getByPlaceholderText('teste');

    expect(textInput.props.secureTextEntry).toBeTruthy();
  });
});
