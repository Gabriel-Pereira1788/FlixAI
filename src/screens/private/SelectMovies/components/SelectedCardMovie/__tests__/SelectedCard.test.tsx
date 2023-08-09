import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../../../mocks/movies';
import JestProviders from '../../../../../../providers/JestProviders';
import {SelectedMoviesStoreImpl} from '../../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import SelectedCardMovie from '../View';

const addToSelected = jest.fn();
const cleanUp = jest.fn();
const removeToSelected = jest.fn();
const mockSelectedMoviesStore: SelectedMoviesStoreImpl = () => ({
  addToSelected,
  cleanUp,
  removeToSelected,
  state: {
    selectedMovies: [],
  },
});
describe('SelectedCardMovie', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SelectedCardMovie
          dataMovie={movies[0]}
          useSelectedMoviesStore={mockSelectedMoviesStore}
        />
      </JestProviders>,
    );

    expect(getByText(movies[0].title)).toBeTruthy();
  });
  it('call addToSelected method', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SelectedCardMovie
          dataMovie={movies[0]}
          useSelectedMoviesStore={mockSelectedMoviesStore}
        />
      </JestProviders>,
    );
    const selectedCard = getByTestId('selected-card');
    fireEvent.press(selectedCard);
    expect(addToSelected).toBeCalled();
  });

  it('render component with isSelected', () => {
    const mockSelectedMoviesStore: SelectedMoviesStoreImpl = () => ({
      addToSelected,
      cleanUp,
      removeToSelected,
      state: {
        selectedMovies: [movies[0]],
      },
    });
    const {getByTestId} = render(
      <JestProviders>
        <SelectedCardMovie
          dataMovie={movies[0]}
          useSelectedMoviesStore={mockSelectedMoviesStore}
        />
      </JestProviders>,
    );
    expect(getByTestId('selected')).toBeTruthy();
  });
});
