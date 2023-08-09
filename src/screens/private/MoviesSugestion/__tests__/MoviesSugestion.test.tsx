import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../mocks/movies';
import {ERROR_DEFAULT} from '../../../../helpers/constants/errorsMessage';
import JestProviders from '../../../../providers/JestProviders';
import {MoviesSugestionViewModel} from '../models';
import PlaylistSugestion from '../View';

const mockOnCreate = jest.fn();
const mockOnSearch = jest.fn();
const mockRedirectScreen = jest.fn();

const mockReturnImpl = {
  moviesList: movies,
  isLoading: false,
  createLibrary: mockOnCreate,
  listenEventSearch: mockOnSearch,
  redirectScreen: mockRedirectScreen,
  textGpt: 'Hello John doe',
  username: 'John doe',
  error: null,
  messageData: {
    text: '',
    id: '',
  },
};
const mockUseMoviesSugestion: MoviesSugestionViewModel = () => mockReturnImpl;
describe('PlaylistSugestion', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <PlaylistSugestion useMoviesSugestion={mockUseMoviesSugestion} />
      </JestProviders>,
    );

    expect(getByText('Hello John doe')).toBeTruthy();
    expect(getByTestId('sugestions')).toBeTruthy();
    expect(getByTestId('container-add')).toBeDefined();
  });
  it('render movies correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <PlaylistSugestion useMoviesSugestion={mockUseMoviesSugestion} />
      </JestProviders>,
    );

    const moviesElement = getAllByTestId('card-movie');

    expect(moviesElement.length).toEqual(movies.length);
  });

  it('render loading screen', () => {
    const mockuseMoviesSugestion: MoviesSugestionViewModel = () => ({
      ...mockReturnImpl,
      isLoading: true,
    });
    const {getByTestId, queryByTestId} = render(
      <JestProviders>
        <PlaylistSugestion useMoviesSugestion={mockuseMoviesSugestion} />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('container-add')).toBeNull();
  });

  it('render error screen', () => {
    const mockUsePlaylistSugestion: MoviesSugestionViewModel = () => ({
      ...mockReturnImpl,
      error: true,
    });
    const {getByText} = render(
      <JestProviders>
        <PlaylistSugestion useMoviesSugestion={mockUsePlaylistSugestion} />
      </JestProviders>,
    );

    expect(getByText(ERROR_DEFAULT)).toBeTruthy();
  });
  it('testing onSearch call function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <PlaylistSugestion useMoviesSugestion={mockUseMoviesSugestion} />
      </JestProviders>,
    );
    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);

    const searchBar = getByTestId('searchBarcomponent');
    expect(searchBar).toBeDefined();
    const buttonSearch = getByTestId('buttonSearch');
    fireEvent.press(buttonSearch);

    expect(mockOnSearch).toBeCalledTimes(1);
  });
});
