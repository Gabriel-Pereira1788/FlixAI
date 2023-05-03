import {Movie} from '../../../../../models/Movie';
import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';
import {SelectedMoviesStoreImpl} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';

type HookProps = {
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
  usePlaylist?: PlaylistImpl;
};

export type CreatePlaylistViewModel = (props: HookProps) => {
  popularMovies: Movie[] | undefined;
  loading: boolean;
  titlePlaylist: string;
  handleCreate(): Promise<void>;
  handleChangeText(value: string): void;
};
