import {Movie, LibraryDTO} from '@models';
import {Playlist} from '../../schemas/PlaylistSchema';

export type PlaylistImpl = () => {
  get(): Realm.Results<Playlist>;
  create(data: LibraryDTO): Promise<void>;
  deleteItem(id: string | number): Promise<void>;
  findMovieInPlaylist(id: number): {
    dataMovie: Movie | null;
    dataPlaylist: Playlist[];
  };
  filtered(query: string): Realm.Results<Playlist>;
};
