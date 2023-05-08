import {PlaylistStoreImpl} from '../src/store/client/PlaylistStore/usePlaylistStore';

export const cleanUpMock = jest.fn();
export const selectPlaylistMock = jest.fn();
export const mockPlaylistStore: PlaylistStoreImpl = () => ({
  cleanUp: cleanUpMock,
  selectPlaylist: selectPlaylistMock,
  state: {
    idPlaylist: null,
  },
});
