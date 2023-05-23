import {Movie} from './Movie';

export interface LibraryDTO {
  _id?: Realm.BSON.ObjectId;
  id?: string;
  title: string;
  movies: Movie[];
}
