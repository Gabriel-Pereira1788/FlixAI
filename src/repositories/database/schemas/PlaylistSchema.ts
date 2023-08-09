import {Realm} from '@realm/react';

import {Movie} from '../../../models/Movie';

export class Playlist extends Realm.Object<Playlist> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  id!: string;
  title!: string;
  movies!: Movie[];

  static schema = {
    name: 'Playlist',
    properties: {
      _id: 'objectId',
      id: 'string',
      title: 'string',
      movies: 'Movies[]',
    },
    primaryKey: '_id',
  };
}
