import {Movie} from '../../../models/Movie';

export class KeywordsGpt extends Realm.Object<KeywordsGpt> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  text!: string;
  keywords!: string;
  movies!: Movie[];

  static schema = {
    name: 'KeywordsGpt',
    properties: {
      _id: 'objectId',
      text: 'string',
      keywords: 'string',
      movies: 'Movies[]',
    },
    primaryKey: '_id',
  };
}
