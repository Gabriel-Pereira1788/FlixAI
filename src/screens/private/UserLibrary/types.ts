import {PlaylistImpl} from '@database';
import {BSON} from 'realm';

import {useUserLibrary} from './UserLibrary.viewModel';

export type HookProps = {
  selectPlaylist: (id: BSON.ObjectId) => void;
  dataPlaylists: ReturnType<PlaylistImpl>;
};

export type UserLibraryViewModel = ReturnType<typeof useUserLibrary>;
