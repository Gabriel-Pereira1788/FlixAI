import {KeywordsDTO} from '@models';

import {KeywordsGpt} from '../../schemas/KeywordsGpt';

export type KeywordsGptImpl = () => {
  create(data: KeywordsDTO): Promise<void>;
  get(): Realm.Results<KeywordsGpt>;
  matchDatabaseKeywords(keywords: string[]): Realm.Results<KeywordsGpt>;
  toValidKeyWords(keywords: string): string[];
};
