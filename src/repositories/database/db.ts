import {createRealmContext} from '@realm/react';

import {KeywordsGpt} from './schemas/KeywordsGpt';
import {Movies} from './schemas/MoviesSchema';
import {Playlist} from './schemas/PlaylistSchema';

export const realmConfig: Realm.Configuration = {
  schema: [Playlist, Movies, KeywordsGpt],
  deleteRealmIfMigrationNeeded: true,
};
// Create a realm context
export const {
  RealmProvider,
  useRealm,
  useObject,
  useQuery: useQueryRealm,
} = createRealmContext(realmConfig);
