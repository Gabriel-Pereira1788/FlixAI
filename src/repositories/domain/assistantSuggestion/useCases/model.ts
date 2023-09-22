import {KeywordsGptImpl} from '@database';

export interface HookProps {
  useKeywordsImpl?: KeywordsGptImpl;
  searchText: string;
}
