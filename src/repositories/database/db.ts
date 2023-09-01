import {createRealmContext} from '@realm/react';

import {Collection} from './schemas/CollectionSchema';
import {KeywordsGpt} from './schemas/KeywordsGpt';
import {Movies} from './schemas/MoviesSchema';

export const realmConfig: Realm.Configuration = {
  schema: [Collection, Movies, KeywordsGpt],
  deleteRealmIfMigrationNeeded: true,
};
// Create a realm context
export const {
  RealmProvider,
  useRealm,
  useObject,
  useQuery: useQueryRealm,
} = createRealmContext(realmConfig);
