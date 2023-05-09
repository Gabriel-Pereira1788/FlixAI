import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import Movies from '../View';
import {MoviesViewModel} from '../model';
import {TMDB_GENRES} from '../../../../helpers/constants/tmdb';
import {dataMoviesMock, movies} from '../../../../../mocks/movies';
import {mockedNavigate} from '../../../../../jestSetup';

const handleFilterMock = jest.fn();
const categories = TMDB_GENRES.filter(genre => !!genre.identify);
const useMoviesMock: MoviesViewModel = () => ({
  categories,
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
    expect(allMovies.length > 0).toBeTruthy();
  });

  it('render list categories', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );
    const allCategories = getAllByTestId('category-element');

    expect(allCategories.length).toEqual(categories.length);
  });
  it('render list with filter', () => {
    const useMoviesMock: MoviesViewModel = () => ({
      categories,
      dataMovies: dataMoviesMock,
      filter: {
        category: 'all',
        text: 'Teste',
      },
      handleFilter: handleFilterMock,
      isLoading: false,
    });
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );
    const filteredMovies = getAllByTestId('filtered-movie-item');

    expect(filteredMovies.length > 0).toBeTruthy();
  });

  it('toggle category onpress element', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );
    const allCategories = getAllByTestId('category-element');

    fireEvent.press(allCategories[0]);

    expect(handleFilterMock).toBeCalledWith({
      category: categories[0].identify,
    });
  });

  it('call handle search function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );

    const input = getByTestId('input-search');
    fireEvent.changeText(input, 'John Doe');
    expect(handleFilterMock).toBeCalledWith({
      text: 'John Doe',
    });
  });

  it('redirect to Single Movie screen', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies useMovies={useMoviesMock} />
      </JestProviders>,
    );

    const allMovies = getAllByTestId('movie-item');
    fireEvent.press(allMovies[0]);
    expect(mockedNavigate).toHaveBeenCalledWith('SingleMovie', {
      idMovie: movies[0].id,
    });
  });
});
