import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import {movies} from '../../../../../mocks/movies';
import {
  mockUseCasePlaylist,
  create,
} from '../../../../../mocks/useCasePlaylist';
import {userMock} from '../../../../../mocks/user';
import {useFocusedScreen} from '../../../../helpers/hooks/useFocusedScreen';
import {SugestionsImpl} from '../../../../store/server/useSugestions';
import {UserImpl} from '../../../../store/server/useUser';
import {useMoviesSugestion} from '../useMoviesSugestion';

const mockFocusedScreen = useFocusedScreen as jest.Mock<
  ReturnType<typeof useFocusedScreen>
>;

jest.mock('../../../../helpers/hooks/useFocusedScreen');

const mockUseSugestion: SugestionsImpl = () => ({
  error: null,

  data: {
    text: 'Hello John Doe',
    movies: movies,
  },
  isLoading: false,
});

const mockUseUser: UserImpl = () => ({
  error: null,
  isLoading: false,
  user: userMock,
});

beforeAll(() => {
  mockFocusedScreen.mockImplementation(() => ({
    focused: true,
  }));
});
describe('useMoviesSugestion', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      useMoviesSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
        useUserImpl: mockUseUser,
      }),
    );

    expect(result.current.moviesList).toEqual(movies);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.username).toEqual(userMock.name);
  });

  it('call create function', () => {
    const {result} = renderHook(() =>
      useMoviesSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
        useUserImpl: mockUseUser,
      }),
    );

    const data = {
      movies: movies.slice(0, 1),
      title: 'Test',
    };
    act(() => {
      result.current.createLibrary(data);
    });

    expect(create).toBeCalledWith(data);
  });

  it('call on search function', () => {
    const {result} = renderHook(() =>
      useMoviesSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
        useUserImpl: mockUseUser,
      }),
    );

    act(() => {
      result.current.listenEventSearch('John doe');
    });

    expect(result.current.messageData.text).toEqual('John doe');
  });

  it('redirect to Single Movie screen', () => {
    const {result} = renderHook(() =>
      useMoviesSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
        useUserImpl: mockUseUser,
      }),
    );

    act(() => {
      result.current.redirectScreen(1)();
    });

    expect(mockedNavigate).toBeCalledWith('SingleMovie', {
      idMovie: 1,
    });
  });
});
