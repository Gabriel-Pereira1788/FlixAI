import {Movie} from './Movie';

export interface PlaylistDTO {
  _id?: Realm.BSON.ObjectId;
  id?: string;
  title: string;
  movies: Movie[];
}
