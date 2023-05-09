import {renderHook} from '@testing-library/react-hooks';
import {movies} from '../../../../../mocks/movies';
import {SugestionsImpl} from '../../../../store/server/useSugestions';
import {usePlaylistSugestion} from '../usePlaylistSugestion';
import {
  mockUseCasePlaylist,
  create,
} from '../../../../../mocks/useCasePlaylist';
import {act} from '@testing-library/react-native';
import {mockedNavigate} from '../../../../../jestSetup';

const mockUseSugestion: SugestionsImpl = () => ({
  data: {
    text: 'Hello John Doe',
    movies: movies,
  },
  isLoading: false,
});

describe('usePlaylistSugestion', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      usePlaylistSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
      }),
    );

    expect(result.current.data).toEqual(movies);
    expect(result.current.isLoading).toBeFalsy();
  });

  it('call create function', () => {
    const {result} = renderHook(() =>
      usePlaylistSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
      }),
    );

    const data = {
      movies: movies.slice(0, 1),
      title: 'Test',
    };
    act(() => {
      result.current.onCreate(data);
    });

    expect(create).toBeCalledWith(data);
  });

  it('call on search function', () => {
    const {result} = renderHook(() =>
      usePlaylistSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
      }),
    );

    act(() => {
      result.current.onSearch('John doe');
    });

    expect(result.current.messageData.text).toEqual('John doe');
  });

  it('redirect to Single Movie screen', () => {
    const {result} = renderHook(() =>
      usePlaylistSugestion({
        useSugestions: mockUseSugestion,
        usePlaylistImpl: mockUseCasePlaylist,
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
