import {KeywordsDTO} from '@models';

import {useQueryRealm, useRealm} from '../../db';
import {KeywordsGpt} from '../../schemas/KeywordsGpt';

import {KeywordsGptImpl} from './model';

//TODO: Refatorar nome
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

  function matchDatabaseKeywords(keywords: string[]) {
    const foundKeywords = get().filtered(`keywords="${keywords}"`);
    return foundKeywords;
  }

  function toValidKeyWords(text: string): string[] {
    const words = text.toLowerCase().match(/\b\S+\b/g);
    const keywords = words
      ? words.filter(word => {
          const excludedWords = [
            'me',
            'a',
            'o',
            'e',
            'com',
            'sem',
            'em',
            'para',
            'de',
            'do',
            'da',
            'dos',
            'das',
            'que',
            'qual',
            'quais',
            'onde',
            'quando',
            'como',
            'por',
            'porque',
            'porquê',
            'listar',
            'filmes',
            'listagem',
            'liste',
          ];
          return !excludedWords.includes(word);
        })
      : [];
    return keywords;
  }
  return {
    create,
    get,
    toValidKeyWords,
    matchDatabaseKeywords,
  };
};
