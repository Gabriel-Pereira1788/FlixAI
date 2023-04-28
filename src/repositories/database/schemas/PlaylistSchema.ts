import Realm from 'realm';
import {Movie} from '../../../models/Movie';

export class Playlist extends Realm.Object<Playlist> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  title!: string;
  movies!: Movie[];

  static schema = {
    name: 'Playlist',
    properties: {
      _id: 'objectId',
      title: 'string',
      movies: 'Movies[]',
    },
    primaryKey: '_id',
  };
}
