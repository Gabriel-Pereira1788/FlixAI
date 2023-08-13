import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import {dataMoviesMock, movies} from '../../../../../mocks/movies';
import {ERROR_DEFAULT} from '../../../../helpers/constants/errorsMessage';
import {TMDB_GENRES} from '../../../../helpers/constants/tmdb';
import JestProviders from '../../../../providers/JestProviders';
import Movies from '../Movies.view';
import {MoviesViewModel} from '../types';

jest.useFakeTimers();

const handleFilterMock = jest.fn();
const categories = TMDB_GENRES.filter(genre => !!genre.identify);

const viewModelMock: MoviesViewModel = {
  categories,
  dataMovies: dataMoviesMock,
  filter: {
    category: 'all',
    text: '',
  },
  handleFilter: handleFilterMock,
  isLoading: false,
  error: null,
};

describe('Movies', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies viewModel={viewModelMock} />
      </JestProviders>,
    );

    const allMovies = getAllByTestId('movie-item');
    expect(allMovies.length > 0).toBeTruthy();
  });

  it('render list categories', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies viewModel={viewModelMock} />
      </JestProviders>,
    );
    const allCategories = getAllByTestId('category-element');

    expect(allCategories.length).toEqual(categories.length);
  });
  it('render list with filter', () => {
    const viewModelMockFilterTest: MoviesViewModel = {
      ...viewModelMock,
      filter: {
        category: 'all',
        text: 'Teste',
      },
    };
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies viewModel={viewModelMockFilterTest} />
      </JestProviders>,
    );
    const filteredMovies = getAllByTestId('filtered-movie-item');

    expect(filteredMovies.length > 0).toBeTruthy();
  });

  it('toggle category onpress element', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Movies viewModel={viewModelMock} />
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
        <Movies viewModel={viewModelMock} />
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
        <Movies viewModel={viewModelMock} />
      </JestProviders>,
    );

    const allMovies = getAllByTestId('movie-item');
    fireEvent.press(allMovies[0]);
    expect(mockedNavigate).toHaveBeenCalledWith('SingleMovie', {
      idMovie: movies[0].id,
    });
  });

  it('render error screen', () => {
    const viewModelMockTestError: MoviesViewModel = {
      ...viewModelMock,
      error: true,
    };
    const {getByText} = render(
      <JestProviders>
        <Movies viewModel={viewModelMockTestError} />
      </JestProviders>,
    );

    expect(getByText(ERROR_DEFAULT)).toBeTruthy();
  });
});
