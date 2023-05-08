import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import ListMovies from '../View';
import {ListMoviesViewModel} from '../model';
import {movies} from '../../../../../mocks/movies';

const mockOnSearch = jest.fn();
const mockUseListMovies: ListMoviesViewModel = () => ({
  title: 'Titulo 1',
  dataMovies: movies,
  handleOnSearch: mockOnSearch,
});
describe('ListMovies', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ListMovies useListMovies={mockUseListMovies} />
      </JestProviders>,
    );

    expect(getByText('Titulo 1')).toBeTruthy();
  });

  it('call onSearch function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <ListMovies useListMovies={mockUseListMovies} />
      </JestProviders>,
    );

    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);
    const buttonSearch = getByTestId('buttonSearch');
    fireEvent.press(buttonSearch);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
