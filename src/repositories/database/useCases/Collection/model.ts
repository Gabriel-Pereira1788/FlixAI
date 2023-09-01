import {Movie, LibraryDTO} from '@models';

import {Collection} from '../../schemas/CollectionSchema';

export type CollectionImpl = () => {
  get(): Realm.Results<Collection>;
  create(data: LibraryDTO): Promise<void>;
  edit(data: LibraryDTO): void;
  removeMovieToCollection: (
    selectedPlaylist: Collection,
    movieId: number,
  ) => Promise<void>;
  findMovieInPlaylist(id: number): DataMovieCollection;
  filtered(query: string): Realm.Results<Collection>;
};

export type DataMovieCollection = {
  dataMovie: Movie | null;
  dataPlaylist: Collection[];
};
