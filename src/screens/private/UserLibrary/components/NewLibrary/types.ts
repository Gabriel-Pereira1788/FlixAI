import {CollectionImpl} from '../../../../../repositories/database/useCases/Collection/model';
import {SelectedMoviesStoreImpl} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {MoviesByGenreImpl} from '../../../../../store/server/useMoviesByGenre';

import {useNewLibraryViewModel} from './NewLibrary.viewModel';

export type HookProps = {
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
  usePlaylist?: CollectionImpl;
  useMoviesByGenreImpl?: MoviesByGenreImpl;
};

export type NewLibraryViewModel = (
  props: HookProps,
) => ReturnType<typeof useNewLibraryViewModel>;

export type ViewModel = ReturnType<typeof useNewLibraryViewModel>;
