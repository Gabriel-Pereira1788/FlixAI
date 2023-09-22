import {Realm} from '@realm/react';

import {Movie} from '../../../models/Movie';

export class Collection extends Realm.Object<Collection> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  id!: string;
  title!: string;
  movies!: Movie[];

  static schema = {
    name: 'Collection',
    properties: {
      _id: 'objectId',
      id: 'string',
      title: 'string',
      movies: 'Movies[]',
    },
    primaryKey: '_id',
  };
}

export type PlaylistResults = Realm.Results<Collection>;
