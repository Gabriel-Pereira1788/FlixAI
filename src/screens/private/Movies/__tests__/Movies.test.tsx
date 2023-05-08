import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import Movies from '../View';
import {MoviesViewModel} from '../model';
import {TMDB_GENRES} from '../../../../helpers/constants/tmdb';
import {dataMoviesMock} from '../../../../../mocks/movies';

const handleFilterMock = jest.fn();

const useMoviesMock: MoviesViewModel = () => ({
  categories: TMDB_GENRES.filter(genre => !!genre.identify),
  dataMovies: dataMoviesMock,
  filter: {
    category: 'all',
    text: '',
  },
  handleFilter: handleFilterMock,
  isLoading: false,
});

describe('Movies', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );

    const allMovies = getAllByTestId('movie-item');
    expect(allMovies.length).toEqual(dataMoviesMock[0].list.length);
  });
});
