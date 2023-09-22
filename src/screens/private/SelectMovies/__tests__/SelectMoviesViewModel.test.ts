import {act, renderHook} from '@testing-library/react-native';

import {dataMoviesMock, movies} from '../../../../../mocks/movies';
import {
  mockUseCasePlaylist,
  create,
} from '../../../../../mocks/useCasePlaylist';
import {useSelectedMoviesActions} from '../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {useAllMovies} from '../../../../store/server/useAllMovies';
import {useSelectMoviesViewModel} from '../SelectMovies.viewModel';
const mockAllMovies = useAllMovies as jest.Mock<
  ReturnType<typeof useAllMovies>
>;

const mockSelectedMoviesActions = useSelectedMoviesActions as jest.Mock<
  ReturnType<typeof useSelectedMoviesActions>
>;

const cleanUpMock = jest.fn();
jest.mock('../../../../store/server/useAllMovies');
jest.mock('../../../../store/client/SelectMovies/useSelectedMoviesStore');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));

jest.mock('@database', () => ({
  usePlaylist: mockUseCasePlaylist,
}));
const navigation: any = {
  goBack: jest.fn(),
};

beforeAll(() => {
  mockSelectedMoviesActions.mockImplementation(() => ({
    cleanUp: cleanUpMock,
    addToSelected: jest.fn(),
    removeToSelected: jest.fn(),
  }));
  mockAllMovies.mockImplementation(() => ({
    data: dataMoviesMock,
    error: null,
    isLoading: false,
  }));
});

describe('useSelectMovies', () => {
  it('call hook correclty', () => {
    const {result} = renderHook(() =>
      useSelectMoviesViewModel({
        navigation,
      }),
    );
    console.log(result.current.dataMovies);
    expect(result.current.searchText).toEqual('');
    expect(result.current.dataMovies?.length).toEqual(2);
  });

  it('call handleChange function', () => {
    const {result} = renderHook(() =>
      useSelectMoviesViewModel({
        navigation,
      }),
    );
    act(() => {
      result.current.handleChange('John doe');
    });
    expect(result.current.searchText).toEqual('John doe');
  });

  it('call onCreate function correctly', async () => {
    const {result} = renderHook(() =>
      useSelectMoviesViewModel({
        navigation,
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
    expect(cleanUpMock).toHaveBeenCalled();
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
