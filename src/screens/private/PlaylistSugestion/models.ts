import {Movie} from '../../../models/Movie';
import {PlaylistDTO} from '../../../models/Playlist';
import {KeywordsGptImpl} from '../../../repositories/database/useCases/KeywordsGpt/model';

type HookProps = {
  useKeywordsGpt?: KeywordsGptImpl;
};

export type PlaylistSugestionViewModel = (props: HookProps) => {
  textGpt?: string;
  data: Movie[] | undefined;
  isLoading: boolean;
  onSearch: (value: string) => Promise<void>;
  onCreate(data: PlaylistDTO): Promise<void>;
  redirectScreen(id: number): () => void;
};
