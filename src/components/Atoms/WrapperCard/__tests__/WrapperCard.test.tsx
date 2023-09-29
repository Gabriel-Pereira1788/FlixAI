import React from 'react';
import {Text} from 'react-native';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {WrapperCard} from '../View';

describe('WrapperCard', () => {
  it('render component correctly with variant "horizontal" ', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <WrapperCard variant="horizontal" testID="wrapper-card">
          <Text>teste</Text>
        </WrapperCard>
      </JestProviders>,
    );

    const wrapperCardElement = getByTestId('wrapper-card');
    const style = wrapperCardElement.props.style[1][0];
    expect(getByText('teste')).toBeTruthy();
    expect(style.flexDirection).toEqual('row');
  });

  it('render component correctly with variant "vertical" ', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <WrapperCard variant="vertical" testID="wrapper-card">
          <Text>teste</Text>
        </WrapperCard>
      </JestProviders>,
    );

    const wrapperCardElement = getByTestId('wrapper-card');
    const style = wrapperCardElement.props.style[1][0];
    expect(getByText('teste')).toBeTruthy();
    expect(style.flexDirection).toEqual('column');
  });

  it('render component correctly with variant "cardMovie" ', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <WrapperCard variant="cardMovie" testID="wrapper-card">
          <Text>teste</Text>
        </WrapperCard>
      </JestProviders>,
    );

    const wrapperCardElement = getByTestId('wrapper-card');
    const style = wrapperCardElement.props.style[1][0];
    expect(getByText('teste')).toBeTruthy();
    expect(style).toEqual({
      width: '100%',
      maxWidth: '100%',
      flexDirection: 'row',
      shadowOffset: {width: 1, height: 1},
      marginVertical: 5,
      padding: 10,
      backgroundColor: '#1e1e2c',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      borderRadius: 16,
    });
  });
});
