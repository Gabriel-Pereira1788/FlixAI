import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {allPlaylistMock} from '../../../../../mocks/useCasePlaylist';
import {useListMoviesViewModel} from '../ListMovies.viewModel';

const create = jest.fn();
const deleteItem = jest.fn();
const goBackMock = jest.fn();

const databaseMock = () => ({
  create,
  deleteItem,
});

const navigationMock = () => ({
  goBack: goBackMock,
});
// useIsFocused;
jest.mock('@infra', () => ({
  useDatabase: databaseMock,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: navigationMock,
  useIsFocused: () => true,
}));

describe('useListMovies', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() =>
      useListMoviesViewModel(allPlaylistMock[1]),
    );

    expect(result.current.moviesList.length).toEqual(
      allPlaylistMock[1].movies.length,
    );
  });

  it('call handleOnSearch function correctly', () => {
    const {result} = renderHook(() =>
      useListMoviesViewModel(allPlaylistMock[1]),
    );

    act(() => {
      result.current.handleOnSearch('Teste 1');
    });

    expect(result.current.moviesList.length).toEqual(1);
  });
});
