import {Realm} from '@realm/react';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';

export type AllPlaylistViewModel = () => {
  searchText: string;
  handleChangeText(value: string): void;
  allPlaylists: Realm.Results<Playlist>;
  redirectScreen: () => void;
};
