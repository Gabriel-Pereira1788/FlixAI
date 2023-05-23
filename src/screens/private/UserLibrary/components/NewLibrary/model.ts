import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';
import {SelectedMoviesStoreImpl} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {MoviesByGenreImpl} from '../../../../../store/server/useMoviesByGenre';
import {useNewLibrary} from './useNewLibrary';

export type HookProps = {
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
  usePlaylist?: PlaylistImpl;
  useMoviesByGenreImpl?: MoviesByGenreImpl;
};

export type NewLibraryViewModel = (
  props: HookProps,
) => ReturnType<typeof useNewLibrary>;
