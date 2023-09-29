import React from 'react';

import {render} from '@testing-library/react-native';

import {movies} from '../../../../../mocks/movies';
import {allPlaylistMock} from '../../../../../mocks/useCasePlaylist';
import {makeVoteAverage} from '../../../../helpers/utils/makeVoteAverage';
import JestProviders from '../../../../providers/JestProviders';
import SingleMovie from '../SingleMovie.view';
import {SingleMovieViewModel} from '../types';

const mockUseSingleMovie: SingleMovieViewModel = {
  error: false,
  loading: false,
  focused: true,
  dataMovie: movies[0],
  collectionsAvailable: allPlaylistMock,
  currentMovieCollection: null,
  refreshCollection: jest.fn(),
};
describe('SingleMovie', () => {
  it('render component correctly', () => {
    const vote = makeVoteAverage(movies[0].vote_count, movies[0].vote_average);
    const {getByText, getByTestId, getAllByTestId} = render(
      <JestProviders>
        <SingleMovie viewModel={mockUseSingleMovie} />
      </JestProviders>,
    );

    expect(getByTestId('gesture-element')).toBeTruthy();
    expect(getByTestId('arrow-rotate')).toBeTruthy();
    expect(getByText(movies[0].title)).toBeTruthy();
    expect(getByText(movies[0].overview)).toBeTruthy();
    expect(`${vote.toFixed(2)} ${movies[0].vote_count}`).toBeTruthy();
    expect(getAllByTestId('card-cast').length).toEqual(movies[0].cast?.length);
  });

  it('render component with loading status', () => {
    const mockUseSingleMovieLoading: SingleMovieViewModel = {
      ...mockUseSingleMovie,
      loading: true,
    };
    const {getByTestId} = render(
      <JestProviders>
        <SingleMovie viewModel={mockUseSingleMovieLoading} />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
  });
});
