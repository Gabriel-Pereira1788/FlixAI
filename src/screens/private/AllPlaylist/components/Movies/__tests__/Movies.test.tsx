import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import Movies from '../View';
import {movies} from '../../../../../../../mocks/movies';

describe('Movies', () => {
  it('render component correctly', () => {
    const {getByTestId, getAllByTestId} = render(
      <JestProviders>
        <Movies movies={movies} />
      </JestProviders>,
    );
    const list = getByTestId('list-movies');
    const moviesElement = getAllByTestId('select-card');

    expect(list).toBeTruthy();
    expect(moviesElement.length).toEqual(3);
  });
});
