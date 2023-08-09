import {Realm} from '@realm/react';
import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import {
  filtered,
  mockUseCasePlaylist,
} from '../../../../../mocks/useCasePlaylist';
import {
  mockPlaylistStore,
  selectPlaylistMock,
} from '../../../../../mocks/usePlaylistStore';
import {useUserLibrary} from '../useUserLibrary';

describe('useUserLibrary', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        usePlaylistStore: mockPlaylistStore,
        useCasePlaylist: mockUseCasePlaylist,
      }),
    );

    expect(result.current.searchText).toEqual('');
    expect(result.current.allPlaylists.length).toEqual(2);
  });
  it('call function handle change text', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        usePlaylistStore: mockPlaylistStore,
        useCasePlaylist: mockUseCasePlaylist,
      }),
    );

    act(() => {
      result.current.handleChangeText('John doe');
    });
    expect(result.current.searchText).toEqual('John doe');
  });

  it('call function filtered if text changed', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        usePlaylistStore: mockPlaylistStore,
        useCasePlaylist: mockUseCasePlaylist,
      }),
    );

    act(() => {
      result.current.handleChangeText('John doe');
    });
    expect(filtered).toBeCalledWith(`title BEGINSWITH[c] "John doe"`);
  });

  it('redirect to SelectMovies screen', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        usePlaylistStore: mockPlaylistStore,
        useCasePlaylist: mockUseCasePlaylist,
      }),
    );

    act(() => {
      result.current.redirectScreen();
    });
    expect(mockedNavigate).toBeCalledWith('SelectMovies');
  });
  it('select playlist called', () => {
    const {result} = renderHook(() =>
      useUserLibrary({
        usePlaylistStore: mockPlaylistStore,
        useCasePlaylist: mockUseCasePlaylist,
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
