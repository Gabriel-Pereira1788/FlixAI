import React from 'react';
import {render} from '@testing-library/react-native';
import ErrorMessage from '../View';
import JestProviders from '../../../providers/JestProviders';
import {Text} from 'native-base';

describe('ErrorMessage', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ErrorMessage message="Algo deu errado">
          <Text>teste</Text>
        </ErrorMessage>
      </JestProviders>,
    );

    expect(getByText('Algo deu errado')).toBeTruthy();

    expect(getByText('teste')).toBeTruthy();
  });

  it('render icon warning', () => {
    const {getByTestId} = render(
      <JestProviders>
        <ErrorMessage message="Algo deu errado" />
      </JestProviders>,
    );

    expect(getByTestId('container-icon')).toBeTruthy();
  });
});
