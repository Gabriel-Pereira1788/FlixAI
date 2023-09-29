import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {InputAuth} from '../View';

const handleChangeMock = jest.fn();

describe('InputAuth', () => {
  it('render component correctly', () => {
    const {getByPlaceholderText} = render(
      <JestProviders>
        <InputAuth placeholder="Email" />
      </JestProviders>,
    );
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('change event called', () => {
    const {getByPlaceholderText} = render(
      <JestProviders>
        <InputAuth
          placeholder="Email"
          value="teste@gmail.com"
          onChangeText={handleChangeMock}
        />
      </JestProviders>,
    );

    const input = getByPlaceholderText('Email');

    fireEvent.changeText(input, 'teste2@email.com');

    expect(handleChangeMock).toBeCalledWith('teste2@email.com');
  });

  it('test error status render', () => {
    const {getByText} = render(
      <JestProviders>
        <InputAuth
          error="Campo vazio"
          placeholder="Email"
          value="teste@gmail.com"
          onChangeText={handleChangeMock}
        />
      </JestProviders>,
    );

    expect(getByText('Campo vazio')).toBeDefined();
  });
});
