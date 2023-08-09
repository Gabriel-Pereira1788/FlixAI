import {KeywordsGptImpl} from '@database';

import {MoviesImpl} from '../../movies/model';
import {SuggestionServiceImpl} from '../model';

export interface HookProps {
  useKeywordsImpl?: KeywordsGptImpl;
  assistantSuggestionService?: SuggestionServiceImpl;
  moviesServices?: Pick<MoviesImpl, 'getAllByName'>;
}
