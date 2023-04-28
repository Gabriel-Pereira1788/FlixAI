import {Realm} from '@realm/react';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';

export type AllPlaylistViewModel = () => {
  allPlaylists: Realm.Results<Playlist>;
  redirectScreen: () => void;
};
