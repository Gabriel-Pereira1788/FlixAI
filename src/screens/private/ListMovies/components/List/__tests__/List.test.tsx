import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import List from '../View';
import {movies} from '../../../../../../../mocks/movies';
import {mockedNavigate} from '../../../../../../../jestSetup';

describe('List', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <List dataMovies={movies} />
      </JestProviders>,
    );

    expect(getAllByTestId('cardMovie').length).toEqual(3);
  });

  it('redirect to SingleMovie page correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <List dataMovies={movies} />
      </JestProviders>,
    );

    const allElements = getAllByTestId('cardMovie');
    fireEvent.press(allElements[0]);

    expect(mockedNavigate).toBeCalledWith('SingleMovie', {
      idMovie: movies[0].id,
    });
  });
});
