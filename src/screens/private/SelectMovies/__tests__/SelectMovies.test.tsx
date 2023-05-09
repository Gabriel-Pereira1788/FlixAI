import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import SelectMovies from '../View';
import {SelectMoviesViewModel} from '../model';
import {dataMoviesMock, movies} from '../../../../../mocks/movies';

const navigation: any = {};
const route: any = {};

const addToSelected = jest.fn();
const handleChange = jest.fn();
const onCreate = jest.fn();

const data = {
  addToSelected,
  dataMovies: dataMoviesMock,
  handleChange,
  loading: false,
  onCreate,
  searchText: '',
  selectedMovies: [],
};
const mockUseSelectMovies: SelectMoviesViewModel = () => data;
describe('SelectMovies', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
      </JestProviders>,
    );

    expect(getByText('Selecione filmes para continuar.')).toBeTruthy();
  });
  it('render if loading property', () => {
    const mockUseSelectMovies: SelectMoviesViewModel = () => ({
      ...data,
      loading: true,
    });
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
  });

  it('call handleChange function for search input component', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
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
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
      </JestProviders>,
    );
    const moviesElement = getAllByTestId('selected-card');
    expect(moviesElement.length).toEqual(movies.length * dataMoviesMock.length);
  });

  it('render movies with filter', () => {
    const mockUseSelectMovies: SelectMoviesViewModel = () => ({
      ...data,
      searchText: 'Teste',
    });
    const {getAllByTestId} = render(
      <JestProviders>
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
      </JestProviders>,
    );
    const moviesElement = getAllByTestId('filter-selected-movie');
    expect(moviesElement.length).toEqual(movies.length);
  });

  it('render open modal if have selected movies', () => {
    const mockUseSelectMovies: SelectMoviesViewModel = () => ({
      ...data,
      selectedMovies: [movies[0]],
    });
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovies
          navigation={navigation}
          route={route}
          useSelectMovies={mockUseSelectMovies}
        />
      </JestProviders>,
    );
    expect(getByTestId('open-modal')).toBeTruthy();
  });
});
