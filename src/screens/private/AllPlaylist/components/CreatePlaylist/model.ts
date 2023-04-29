import {Movie} from '../../../../../models/Movie';

export type CreatePlaylistViewModel = () => {
  popularMovies: Movie[] | undefined;
  loading: boolean;
  titlePlaylist: string;
  handleCreate(): Promise<void>;
  handleChangeText(value: string): void;
};
