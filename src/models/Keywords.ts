import {Movie} from './Movie';

export interface KeywordsDTO {
  _id?: Realm.BSON.ObjectId;
  text: string;
  keywords: string;
  movies: Movie[];
}
