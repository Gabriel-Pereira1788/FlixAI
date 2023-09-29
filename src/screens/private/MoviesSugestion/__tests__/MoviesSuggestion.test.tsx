import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../mocks/movies';
import {ERROR_DEFAULT} from '../../../../helpers/constants/errorsMessage';
import JestProviders from '../../../../providers/JestProviders';
import {MoviesSuggestionView} from '../MoviesSuggestions.view';
import {MoviesSugestionViewModel} from '../types';

jest.useFakeTimers();

const mockOnSearch = jest.fn();
const mockRedirectScreen = jest.fn();

const mockViewModel: MoviesSugestionViewModel = {
  moviesList: movies,
  isLoading: false,
  listenEventSearch: mockOnSearch,
  redirectScreen: mockRedirectScreen,
  message: 'Hello John doe',
  error: null,
  messageData: {
    text: '',
    id: '',
  },
};
describe('MoviesSuggestion', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <MoviesSuggestionView username="John doe" viewModel={mockViewModel} />
      </JestProviders>,
    );

    expect(getByText('Hello John doe')).toBeTruthy();
    expect(getByTestId('container-add')).toBeDefined();
  });
  it('render movies correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <MoviesSuggestionView username="John doe" viewModel={mockViewModel} />
      </JestProviders>,
    );

    const moviesElement = getAllByTestId('card-movie');

    expect(moviesElement.length).toEqual(movies.length);
  });

  it('render loading screen', () => {
    const mockViewModelLoadingTest: MoviesSugestionViewModel = {
      ...mockViewModel,
      isLoading: true,
    };
    const {getByTestId, queryByTestId} = render(
      <JestProviders>
        <MoviesSuggestionView
          username="John doe"
          viewModel={mockViewModelLoadingTest}
        />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('container-add')).toBeNull();
  });

  it('render error screen', () => {
    const mockViewModelError: MoviesSugestionViewModel = {
      ...mockViewModel,
      error: true,
    };
    const {getByText} = render(
      <JestProviders>
        <MoviesSuggestionView
          username="John doe"
          viewModel={mockViewModelError}
        />
      </JestProviders>,
    );

    expect(getByText(ERROR_DEFAULT)).toBeTruthy();
  });

  it('testing onSearch call function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <MoviesSuggestionView username="John doe" viewModel={mockViewModel} />
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
