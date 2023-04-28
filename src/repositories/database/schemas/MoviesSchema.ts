import Realm from 'realm';

export class Movies extends Realm.Object<Movies> {
  name!: string;

  static schema = {
    name: 'Movies',
    embedded: true,
    properties: {
      backdrop_path: 'string',
      id: 'int',
      original_title: 'string',
      overview: 'string',
      poster_path: 'string',
      release_date: 'string',
      title: 'string',
      name: 'string?',
      vote_average: 'int',
      vote_count: 'int',
      homepage: 'string?',
      imdb_id: 'string?',
    },
  };
}
