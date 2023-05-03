import {Realm} from '@realm/react';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import {PlaylistStoreImpl} from '../../../store/client/PlaylistStore/usePlaylistStore';

type HookProps = {
  usePlaylistStore?: PlaylistStoreImpl;
};

export type AllPlaylistViewModel = (props: HookProps) => {
  searchText: string;
  allPlaylists: Realm.Results<Playlist>;
  handleChangeText(value: string): void;
  redirectScreen: () => void;
  handleSelectPlaylist(id: Realm.BSON.ObjectId): void;
};
