import {Realm} from '@realm/react';
import {Movie} from '../../../../../models/Movie';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';
import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';

type HookProps = {
  movie: Movie;
  usePlaylistImpl?: PlaylistImpl;
  useRealmImpl?: () => Realm;
};

export type AddModalViewModel = (props: HookProps) => {
  dataPlaylist: Realm.Results<Playlist>;
  idPlaylist: string;
  handleChange: (value: string) => void;
  onAdd: () => void;
};
