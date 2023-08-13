import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../mocks/movies';
import JestProviders from '../../../../providers/JestProviders';
import ListMovies from '../ListMovies.view';
import {ListMoviesViewModel} from '../types';
const mockOnSearch = jest.fn();
const mockConfirmation = jest.fn();
const viewModelMock: ListMoviesViewModel = {
  moviesList: movies,
  handleOnSearch: mockOnSearch,
  openModalConfirmation: mockConfirmation,
};

describe('ListMovies', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ListMovies title="John doe" viewModel={viewModelMock} />
      </JestProviders>,
    );

    expect(getByText('John doe')).toBeTruthy();
  });

  it('call onSearch function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <ListMovies viewModel={viewModelMock} title="John doe" />
      </JestProviders>,
    );

    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);
    const buttonSearch = getByTestId('buttonSearch');
    fireEvent.press(buttonSearch);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
