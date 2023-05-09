import {renderHook} from '@testing-library/react-hooks';
import {useRemoveModal} from '../useRemoveModal';
import {movies} from '../../../../../../../mocks/movies';
import {allPlaylistMock} from '../../../../../../../mocks/useCasePlaylist';
import {mockUseRealm, write, data} from '../../../../../../../mocks/useRealm';
import {act} from '@testing-library/react-native';

describe('useRemoveModal', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      useRemoveModal({
        movie: movies[0],
        playlist: allPlaylistMock,
        useRealmImpl: mockUseRealm,
      }),
    );

    expect(result.current).toBeTruthy();
  });

  it('call handleChange method correctly', () => {
    const {result} = renderHook(() =>
      useRemoveModal({
        movie: movies[0],
        playlist: allPlaylistMock,
        useRealmImpl: mockUseRealm,
      }),
    );

    act(() => {
      result.current.handleChange(allPlaylistMock[0].id);
    });

    expect(result.current.selectedPlaylist?.id).toEqual(allPlaylistMock[0].id);
  });

  it('call onRemove method with selectedPlaylist', () => {
    const {result} = renderHook(() =>
      useRemoveModal({
        movie: movies[0],
        playlist: allPlaylistMock,
        useRealmImpl: mockUseRealm,
      }),
    );
    act(() => {
      result.current.handleChange(allPlaylistMock[0].id);
    });

    act(() => {
      result.current.onRemove();
    });

    expect(write).toBeCalled();
  });
  it('call onRemove method without selectedPlaylist', () => {
    const write = jest.fn();
    const mockUseRealm = () => ({...data, write} as any);
    const {result} = renderHook(() =>
      useRemoveModal({
        movie: movies[0],
        playlist: allPlaylistMock,
        useRealmImpl: mockUseRealm,
      }),
    );

    act(() => {
      result.current.onRemove();
    });

    expect(write).toHaveBeenCalledTimes(0);
  });
});
