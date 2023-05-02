import {Realm} from '@realm/react';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';

export type AllPlaylistViewModel = () => {
  searchText: string;
  allPlaylists: Realm.Results<Playlist>;
  handleChangeText(value: string): void;
  redirectScreen: () => void;
  handleSelectPlaylist(id: Realm.BSON.ObjectId): void;
};
