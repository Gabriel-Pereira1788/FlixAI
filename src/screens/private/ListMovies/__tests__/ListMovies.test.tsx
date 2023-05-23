import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import ListMovies from '../View';
import {ListMoviesViewModel} from '../model';
import {movies} from '../../../../../mocks/movies';
import {allPlaylistMock} from '../../../../../mocks/useCasePlaylist';
const mockOnSearch = jest.fn();
const mockUseListMovies: ListMoviesViewModel = () => ({
  title: 'Titulo 1',
  moviesList: movies,
  handleOnSearch: mockOnSearch,
  library: allPlaylistMock[0],
});

const navigation = {
  goBack: jest.fn(),
} as any;

const route = {} as any;
describe('ListMovies', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ListMovies
          useListMovies={mockUseListMovies}
          navigation={navigation}
          route={route}
        />
      </JestProviders>,
    );

    expect(getByText('Titulo 1')).toBeTruthy();
  });

  it('call onSearch function', () => {
    const {getByTestId} = render(
      <JestProviders>
        <ListMovies
          useListMovies={mockUseListMovies}
          navigation={navigation}
          route={route}
        />
      </JestProviders>,
    );

    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);
    const buttonSearch = getByTestId('buttonSearch');
    fireEvent.press(buttonSearch);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
