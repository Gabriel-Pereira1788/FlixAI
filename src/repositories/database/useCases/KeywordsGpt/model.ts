import {KeywordsDTO} from '../../../../models/Keywords';
import {KeywordsGpt} from '../../schemas/KeywordsGpt';

export type KeywordsGptImpl = () => {
  create(data: KeywordsDTO): Promise<void>;
  get(): Realm.Results<KeywordsGpt>;
};
