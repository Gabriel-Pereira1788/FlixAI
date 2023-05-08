import {Movie} from '../../../../models/Movie';
import {PlaylistDTO} from '../../../../models/Playlist';
import {Playlist} from '../../schemas/PlaylistSchema';

export type PlaylistImpl = () => {
  get(): Realm.Results<Playlist>;
  create(data: PlaylistDTO): Promise<void>;
  deleteItem(id: string | number): Promise<void>;
  findMovieInPlaylist(id: number): {
    dataMovie: Movie | null;
    dataPlaylist: Playlist[];
  };
  filtered(query: string): Realm.Results<Playlist>;
};
