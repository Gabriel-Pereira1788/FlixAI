import {KeywordsDTO} from '../../../../models/Keywords';
import {useQueryRealm, useRealm} from '../../db';
import {KeywordsGpt} from '../../schemas/KeywordsGpt';
import {KeywordsGptImpl} from './model';

export const _useKeywordsGpt: KeywordsGptImpl = () => {
  const keywordsGpt = useQueryRealm(KeywordsGpt);
  const realm = useRealm();

  function get(): Realm.Results<KeywordsGpt> {
    return keywordsGpt;
  }
  async function create(data: KeywordsDTO) {
    realm.write(() => {
      realm.create<KeywordsDTO>('KeywordsGpt', {
        _id: new Realm.BSON.ObjectID(),
        text: data.text,
        movies: data.movies,
        keywords: data.keywords,
      });
    });
  }
  return {
    create,
    get,
  };
};
