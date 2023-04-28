import {Realm} from '@realm/react';
import {Movie} from '../../../../../models/Movie';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';

type HookProps = {
  movie: Movie;
};

export type AddModalViewModel = (props: HookProps) => {
  dataPlaylist: Realm.Results<Playlist>;
  idPlaylist: string;
  handleChange: (value: string) => void;
  onAdd: () => void;
};
