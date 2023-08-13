import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../../jestSetup';
import {movies} from '../../../../../../mocks/movies';
import JestProviders from '../../../../../providers/JestProviders';
import {ListMoviesContent} from '../ListMoviesContent';

describe('List', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <ListMoviesContent moviesList={movies} />
      </JestProviders>,
    );

    expect(getAllByTestId('cardMovie').length).toEqual(3);
  });

  it('redirect to SingleMovie page correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <ListMoviesContent moviesList={movies} />
      </JestProviders>,
    );

    const allElements = getAllByTestId('cardMovie');
    fireEvent.press(allElements[0]);

    expect(mockedNavigate).toBeCalledWith('SingleMovie', {
      idMovie: movies[0].id,
    });
  });
});
