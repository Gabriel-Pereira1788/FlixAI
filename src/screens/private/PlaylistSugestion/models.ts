import {Movie} from '../../../models/Movie';
import {PlaylistDTO} from '../../../models/Playlist';

export type PlaylistSugestionViewModel = () => {
  textGpt?: string;
  data: Movie[] | undefined;
  isLoading: boolean;
  onSearch: (value: string) => Promise<void>;
  onCreate(data: PlaylistDTO): Promise<void>;
  redirectScreen(id: number): () => void;
};
