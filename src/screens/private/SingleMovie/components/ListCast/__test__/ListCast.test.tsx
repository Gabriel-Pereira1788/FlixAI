import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import ListCast from '../View';
import {dataCast} from '../../../../../../../mocks/cast';

describe('ListCast', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <ListCast cast={dataCast} />
      </JestProviders>,
    );

    const cardElements = getAllByTestId('card-cast');
    expect(cardElements.length).toEqual(dataCast.length);
  });

  it('render component without data', () => {
    const {queryAllByTestId} = render(
      <JestProviders>
        <ListCast cast={[]} />
      </JestProviders>,
    );

    const cardElements = queryAllByTestId('card-cast');
    expect(cardElements.length).toEqual(0);
  });
});
