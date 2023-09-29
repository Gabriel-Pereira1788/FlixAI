import {allPlaylistMock} from '@mocks';
import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';

import {movies} from '../../../../../mocks/movies';
import {useCollection} from '../../../../repositories/database/useCases/Collection/useCollection';
import {useGetSingleMovie} from '../../../../repositories/domain/movies/useCases/useGetSingleMovie';
import {useSingleMovieViewModel} from '../SingleMovie.viewModel';

const mockUseGetSingleMovie = useGetSingleMovie as jest.Mock<
  ReturnType<typeof useGetSingleMovie>
>;

const mockUseCollection = useCollection as jest.Mock<
  ReturnType<typeof useCollection>
>;

jest.mock(
  '../../../../repositories/database/useCases/Collection/useCollection',
);

jest.mock('../../../../helpers/hooks/useFocusedScreen');

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));
jest.mock('../../../../repositories/domain/movies/useCases/useGetSingleMovie');

const collectionMock = {
  playlists: allPlaylistMock,
  edit: jest.fn(),
  create: jest.fn(),
  get: jest.fn().mockReturnValue(allPlaylistMock),
  findMovieInPlaylist: jest.fn().mockReturnValue(allPlaylistMock[0]),
  removeMovieToCollection: jest.fn(),
  filtered: jest.fn(),
};

describe('useSingleMovie', () => {
  beforeAll(() => {
    jest.mock('@react-navigation/native', () => ({
      useIsFocused: () => true,
    }));
    mockUseCollection.mockImplementation(() => collectionMock);
    mockUseGetSingleMovie.mockImplementation(() => ({
      data: movies[0],
      error: null,
      isLoading: false,
    }));
  });

  it('call hook correctly', () => {
    const {result} = renderHook(() => useSingleMovieViewModel(1));

    expect(result.current.dataMovie?.id).toEqual(movies[0].id);
  });

  it('call function refresh collection', () => {
    const {result} = renderHook(() => useSingleMovieViewModel(1));

    act(() => {
      result.current.refreshCollection();
    });

    expect(collectionMock.findMovieInPlaylist).toBeCalled();
    expect(result.current.currentMovieCollection).toEqual(allPlaylistMock[0]);
  });

  it('get all movies collection', () => {
    const {result} = renderHook(() => useSingleMovieViewModel(1));

    expect(result.current.collectionsAvailable).toEqual(allPlaylistMock);
  });
});
