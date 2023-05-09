import {renderHook} from '@testing-library/react-hooks';
import {useAddModal} from '../useAddModal';
import {movies} from '../../../../../../../mocks/movies';
import {
  mockUseCasePlaylist,
  filtered,
} from '../../../../../../../mocks/useCasePlaylist';
import {mockUseRealm, write} from '../../../../../../../mocks/useRealm';
import {act} from '@testing-library/react-native';

describe('useAddModal', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      useAddModal({
        movie: movies[2],
        usePlaylistImpl: mockUseCasePlaylist,
        useRealmImpl: mockUseRealm,
      }),
    );

    expect(result.current.dataPlaylist.length).toEqual(2);
  });
  it('call handle change method', () => {
    const {result} = renderHook(() =>
      useAddModal({
        movie: movies[2],
        usePlaylistImpl: mockUseCasePlaylist,
        useRealmImpl: mockUseRealm,
      }),
    );

    act(() => {
      result.current.handleChange('John doe');
    });

    expect(result.current.idPlaylist).toEqual('John doe');
  });

  it('add  movie without  playlist', () => {
    const {result} = renderHook(() =>
      useAddModal({
        movie: movies[2],
        usePlaylistImpl: mockUseCasePlaylist,
        useRealmImpl: mockUseRealm,
      }),
    );

    act(() => {
      result.current.handleChange('John doe');
    });

    act(() => {
      result.current.onAdd();
    });

    expect(filtered).toBeCalledWith(`title = "${result.current.idPlaylist}"`);
    expect(write).toBeCalled();
  });
});
