import {createRealmContext} from '@realm/react';
import {Playlist} from './schemas/PlaylistSchema';
import {Movies} from './schemas/MoviesSchema';

const realmConfig: Realm.Configuration = {
  schema: [Playlist, Movies],
  deleteRealmIfMigrationNeeded: true,
};
// Create a realm context
export const {
  RealmProvider,
  useRealm,
  useObject,
  useQuery: useQueryRealm,
} = createRealmContext(realmConfig);
