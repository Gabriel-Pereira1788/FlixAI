import React from 'react';

import {render} from '@testing-library/react-native';

import {dataCast} from '../../../../../../mocks/cast';
import JestProviders from '../../../../../providers/JestProviders';
import {SingleMovieListCast} from '../SingleMovieListCast';

describe('SingleMovieListCast', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <SingleMovieListCast cast={dataCast} />
      </JestProviders>,
    );

    const cardElements = getAllByTestId('card-cast');
    expect(cardElements.length).toEqual(dataCast.length);
  });

  it('render component without data', () => {
    const {queryAllByTestId} = render(
      <JestProviders>
        <SingleMovieListCast cast={[]} />
      </JestProviders>,
    );

    const cardElements = queryAllByTestId('card-cast');
    expect(cardElements.length).toEqual(0);
  });
});
