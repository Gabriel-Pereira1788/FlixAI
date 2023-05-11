import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import PlaylistSugestion from '../View';
import {PlaylistSugestionViewModel} from '../models';
import {movies} from '../../../../../mocks/movies';
import {ERROR_DEFAULT} from '../../../../helpers/constants/errorsMessage';

const mockOnCreate = jest.fn();
const mockOnSearch = jest.fn();
const mockRedirectScreen = jest.fn();

const data = {
  data: movies,
  isLoading: false,
  onCreate: mockOnCreate,
  onSearch: mockOnSearch,
  redirectScreen: mockRedirectScreen,
  textGpt: 'Hello John doe',
  username: 'John doe',
  error: null,
  messageData: {
    text: '',
    id: '',
  },
};
const mockUsePlaylistSugestion: PlaylistSugestionViewModel = () => data;
describe('PlaylistSugestion', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <PlaylistSugestion usePlaylistSugestion={mockUsePlaylistSugestion} />
      </JestProviders>,
    );

    expect(getByText('Hello John doe')).toBeTruthy();
    expect(getByTestId('sugestions')).toBeTruthy();
    expect(getByTestId('container-add')).toBeDefined();
  });
  it('render movies correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <PlaylistSugestion usePlaylistSugestion={mockUsePlaylistSugestion} />
      </JestProviders>,
    );

    const moviesElement = getAllByTestId('card-movie');

    expect(moviesElement.length).toEqual(movies.length);
  });

  it('render loading screen', () => {
    const mockUsePlaylistSugestion: PlaylistSugestionViewModel = () => ({
      ...data,
      isLoading: true,
    });
    const {getByTestId, queryByTestId} = render(
      <JestProviders>
        <PlaylistSugestion usePlaylistSugestion={mockUsePlaylistSugestion} />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('container-add')).toBeNull();
  });

  it('render error screen', () => {
    const mockUsePlaylistSugestion: PlaylistSugestionViewModel = () => ({
      ...data,
      error: true,
    });
    const {getByText} = render(
      <JestProviders>
        <PlaylistSugestion usePlaylistSugestion={mockUsePlaylistSugestion} />
      </JestProviders>,
    );

    expect(getByText(ERROR_DEFAULT)).toBeTruthy();
  });
  it('testing onSearch call function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <PlaylistSugestion usePlaylistSugestion={mockUsePlaylistSugestion} />
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
