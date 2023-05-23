import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import SelectMovieCard from '../View';
import {Movie} from '../../../../../../models/Movie';
import {SelectedMoviesStoreImpl} from '../../../../../../store/client/SelectMovies/useSelectedMoviesStore';
const movie: Movie = {
  backdrop_path: 'www.example.com',
  id: 3,
  original_title: 'Teste Movie 3',
  overview: 'teste overview',
  poster_path: 'www.example.com',
  release_date: '31/13',
  title: 'Teste 3',
  name: 'teste 3',
  vote_average: 7.5,
  vote_count: 100,
  imdb_id: '...',
  genre_ids: [1, 2, 3],
};

const addToSelectedMock = jest.fn();
const cleanUpMock = jest.fn();
const removeToSelectedMock = jest.fn();
const useSelectedMovieStoreMock: SelectedMoviesStoreImpl = () => ({
  addToSelected: addToSelectedMock,
  cleanUp: cleanUpMock,
  removeToSelected: removeToSelectedMock,
  state: {
    selectedMovies: [],
  },
});
describe('SelectMovieCard', () => {
  it('render component without selected', () => {
    const {getByText, getByTestId, queryByTestId} = render(
      <JestProviders>
        <SelectMovieCard
          {...movie}
          useSelectedMoviesStore={useSelectedMovieStoreMock}
        />
      </JestProviders>,
    );

    expect(getByText(movie.title)).toBeTruthy();
    expect(getByTestId('select-card')).toBeTruthy();
    expect(queryByTestId('icon-selectd')).toBeNull();
  });

  it('render component with status selected', () => {
    const useSelectedMovieStoreMock: SelectedMoviesStoreImpl = () => ({
      addToSelected: addToSelectedMock,
      cleanUp: cleanUpMock,
      removeToSelected: removeToSelectedMock,
      state: {
        selectedMovies: [movie],
      },
    });
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovieCard
          {...movie}
          useSelectedMoviesStore={useSelectedMovieStoreMock}
        />
      </JestProviders>,
    );

    expect(getByTestId('icon-selected')).toBeTruthy();
  });

  it('call function addToSelected correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovieCard
          {...movie}
          useSelectedMoviesStore={useSelectedMovieStoreMock}
        />
      </JestProviders>,
    );
    const card = getByTestId('select-card');
    fireEvent.press(card);
    expect(addToSelectedMock).toHaveBeenCalled();
  });
  it('call function removeToSelected correctly', () => {
    const useSelectedMovieStoreMock: SelectedMoviesStoreImpl = () => ({
      addToSelected: addToSelectedMock,
      cleanUp: cleanUpMock,
      removeToSelected: removeToSelectedMock,
      state: {
        selectedMovies: [movie],
      },
    });
    const {getByTestId} = render(
      <JestProviders>
        <SelectMovieCard
          {...movie}
          useSelectedMoviesStore={useSelectedMovieStoreMock}
        />
      </JestProviders>,
    );
    const card = getByTestId('select-card');
    fireEvent.press(card);
    expect(removeToSelectedMock).toHaveBeenCalled();
  });
});
