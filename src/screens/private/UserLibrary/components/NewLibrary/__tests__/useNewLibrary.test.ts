import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';
import {movies} from '../../../../../../../mocks/movies';
import {
  create,
  mockUseCasePlaylist,
} from '../../../../../../../mocks/useCasePlaylist';
import {SelectedMoviesStoreImpl} from '../../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {MoviesByGenreImpl} from '../../../../../../store/server/useMoviesByGenre';
import {useNewLibrary} from '../useNewLibrary';

const addToSelected = jest.fn();
const cleanUp = jest.fn();
const removeToSelected = jest.fn();

const selectedMovies = movies.slice(0, 2);
const mockUseSelectedMoviesStore: SelectedMoviesStoreImpl = () => ({
  addToSelected,
  cleanUp,
  removeToSelected,
  state: {selectedMovies},
});

const mockUseMoviesByGenre: MoviesByGenreImpl = () => ({
  data: movies,
  error: null,
  isLoading: false,
});
describe('useNewLibrary', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() =>
      useNewLibrary({
        useSelectedMoviesStore: mockUseSelectedMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useMoviesByGenreImpl: mockUseMoviesByGenre,
      }),
    );

    expect(result.current.popularMovies?.length).toEqual(movies.length);
  });

  it('call change title library', () => {
    const {result} = renderHook(() =>
      useNewLibrary({
        useSelectedMoviesStore: mockUseSelectedMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useMoviesByGenreImpl: mockUseMoviesByGenre,
      }),
    );
    act(() => {
      result.current.handleChangeText('Title');
    });
    expect(result.current.titleLibrary).toEqual('Title');
  });

  it('call createLibrary method correctly', async () => {
    const {result} = renderHook(() =>
      useNewLibrary({
        useSelectedMoviesStore: mockUseSelectedMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useMoviesByGenreImpl: mockUseMoviesByGenre,
      }),
    );
    await act(async () => {
      await result.current.handleChangeText('Title');
      await result.current.createLibrary();
    });

    expect(create).toBeCalledWith({
      title: result.current.titleLibrary,
      movies: selectedMovies,
    });

    expect(cleanUp).toBeCalled();
  });
});
