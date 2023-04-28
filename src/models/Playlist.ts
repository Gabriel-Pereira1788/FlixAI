import {Movie} from './Movie';

export interface PlaylistDTO {
  _id?: Realm.BSON.ObjectId;
  title: string;
  movies: Movie[];
}
