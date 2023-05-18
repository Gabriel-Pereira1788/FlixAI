import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';

import {SugestionsImpl} from '../../../store/server/useSugestions';
import {UserImpl} from '../../../store/server/useUser';
import {useMoviesSugestion} from './useMoviesSugestion';

export type HookProps = {
  useSugestions?: SugestionsImpl;
  usePlaylistImpl?: PlaylistImpl;
  useUserImpl?: UserImpl;
};

export type MoviesSugestionViewModel = (
  props: HookProps,
) => ReturnType<typeof useMoviesSugestion>;
