import {Realm} from '@realm/react';
import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import {
  filtered,
  mockUseCasePlaylist,
} from '../../../../../mocks/useCasePlaylist';
import {selectPlaylistMock} from '../../../../../mocks/usePlaylistStore';
import {useUserLibrary} from '../UserLibrary.viewModel';

describe('useUserLibrary', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        dataPlaylists: mockUseCasePlaylist(),
        selectPlaylist: selectPlaylistMock,
      }),
    );

    expect(result.current.allPlaylists?.length).toEqual(2);
  });

  it('call function filtered if text changed', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        dataPlaylists: mockUseCasePlaylist(),
        selectPlaylist: selectPlaylistMock,
      }),
    );

    act(() => {
      result.current.fetchPlaylists('John doe');
    });
    expect(filtered).toBeCalledWith(`title BEGINSWITH[c] "John doe"`);
  });

  it('select playlist called', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        dataPlaylists: mockUseCasePlaylist(),
        selectPlaylist: selectPlaylistMock,
      }),
    );

    const id = new Realm.BSON.ObjectID();
    act(() => {
      result.current.handleSelectLibrary(id);
    });
    expect(selectPlaylistMock).toBeCalledWith(id);
    expect(mockedNavigate).toBeCalledWith('ListMovies');
  });
});
