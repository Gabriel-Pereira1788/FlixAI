import {act, renderHook} from '@testing-library/react-native';

import {dataMoviesMock, movies} from '../../../../../mocks/movies';
import {
  mockUseCasePlaylist,
  create,
} from '../../../../../mocks/useCasePlaylist';
import {useFocusedScreen} from '../../../../helpers/hooks/useFocusedScreen';
import {SelectedMoviesStoreImpl} from '../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {AllMoviesImpl} from '../../../../store/server/useAllMovies';
import {_useSelectMovies} from '../useSelectMovies';

const mockedFocusedScreen = useFocusedScreen as jest.Mock<
  ReturnType<typeof useFocusedScreen>
>;

jest.mock('../../../../helpers/hooks/useFocusedScreen');
const addToSelected = jest.fn();
const cleanUp = jest.fn();
const removeToSelected = jest.fn();
const mockUseSelectMoviesStore: SelectedMoviesStoreImpl = () => ({
  addToSelected,
  cleanUp,
  removeToSelected,
  state: {
    selectedMovies: [movies[0]],
  },
});

const mockUseAllMovies: AllMoviesImpl = () => ({
  data: dataMoviesMock,
  error: null,
  isLoading: false,
});
const navigation: any = {
  goBack: jest.fn(),
};

describe('useSelectMovies', () => {
  beforeEach(() => {
    mockedFocusedScreen.mockImplementation(() => ({
      focused: true,
    }));
  });
  it('call hook correclty', () => {
    const {result} = renderHook(() =>
      _useSelectMovies({
        navigation,
        useSelectedMoviesStore: mockUseSelectMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useAllMovies: mockUseAllMovies,
      }),
    );
    console.log(result.current.dataMovies);
    expect(result.current.searchText).toEqual('');
    expect(result.current.dataMovies?.length).toEqual(2);
  });

  it('call handleChange function', () => {
    const {result} = renderHook(() =>
      _useSelectMovies({
        navigation,
        useSelectedMoviesStore: mockUseSelectMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useAllMovies: mockUseAllMovies,
      }),
    );
    act(() => {
      result.current.handleChange('John doe');
    });
    expect(result.current.searchText).toEqual('John doe');
  });

  it('selected movies data', () => {
    const {result} = renderHook(() =>
      _useSelectMovies({
        navigation,
        useSelectedMoviesStore: mockUseSelectMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useAllMovies: mockUseAllMovies,
      }),
    );
    expect(result.current.selectedMovies.length > 0).toBeTruthy();
  });

  it('call onCreate function correctly', async () => {
    const {result} = renderHook(() =>
      _useSelectMovies({
        navigation,
        useSelectedMoviesStore: mockUseSelectMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useAllMovies: mockUseAllMovies,
      }),
    );
    const data = {
      movies: movies.slice(0, 2),
      title: 'Teste 1',
    };
    await act(async () => {
      await result.current.onCreate(data);
    });
    expect(create).toHaveBeenCalledWith(data);
    expect(cleanUp).toHaveBeenCalled();
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('render hook without focus screen', async () => {
    mockedFocusedScreen.mockImplementation(() => ({
      focused: false,
    }));
    const {result} = renderHook(() =>
      _useSelectMovies({
        navigation,
        useSelectedMoviesStore: mockUseSelectMoviesStore,
        usePlaylist: mockUseCasePlaylist,
        useAllMovies: mockUseAllMovies,
      }),
    );
    expect(result.current.dataMovies?.length === 0).toBeTruthy();
  });
});
