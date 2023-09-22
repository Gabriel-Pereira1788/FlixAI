import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {dataMoviesMock, movies} from '../../../../../mocks/movies';
import {ERROR_DEFAULT} from '../../../../helpers/constants/errorsMessage';
import JestProviders from '../../../../providers/JestProviders';
import SelectMovies from '../SelectMovies.view';
import {SelectMoviesViewModel} from '../types';

const handleChange = jest.fn();
const onCreate = jest.fn();

const viewModelMock: SelectMoviesViewModel = {
  dataMovies: dataMoviesMock,
  handleChange,
  loading: false,
  onCreate,
  searchText: '',
  error: false,
};
describe('SelectMovies', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelMock} />
      </JestProviders>,
    );

    expect(getByText('Selecione filmes para continuar.')).toBeTruthy();
  });
  it('render if loading property', () => {
    const viewModelMockLoadingTest: SelectMoviesViewModel = {
      ...viewModelMock,
      loading: true,
    };
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelMockLoadingTest} />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
  });

  it('call handleChange function for search input component', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelMock} />
      </JestProviders>,
    );
    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);
    const input = getByTestId('search-input');
    fireEvent.changeText(input, 'John doe');
    expect(handleChange).toHaveBeenCalledWith('John doe');
  });

  it('render movies element', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelMock} />
      </JestProviders>,
    );
    const moviesElement = getAllByTestId('selected-card');
    expect(moviesElement.length).toEqual(movies.length * dataMoviesMock.length);
  });

  it('render movies with filter', () => {
    const viewModelMockFilter: SelectMoviesViewModel = {
      ...viewModelMock,
      searchText: 'Teste',
    };
    const {getAllByTestId} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelMockFilter} />
      </JestProviders>,
    );
    const moviesElement = getAllByTestId('filter-selected-movie');
    expect(moviesElement.length).toEqual(movies.length);
  });

  it('render error screen', () => {
    const viewModelErrorTest: SelectMoviesViewModel = {
      ...viewModelMock,
      error: true,
    };
    const {getByText} = render(
      <JestProviders>
        <SelectMovies viewModel={viewModelErrorTest} />
      </JestProviders>,
    );
    expect(getByText(ERROR_DEFAULT)).toBeTruthy();
  });
});
