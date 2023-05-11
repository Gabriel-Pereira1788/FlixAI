import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';

import {SugestionsImpl} from '../../../store/server/useSugestions';
import {UserImpl} from '../../../store/server/useUser';
import {usePlaylistSugestion} from './usePlaylistSugestion';

export type HookProps = {
  useSugestions?: SugestionsImpl;
  usePlaylistImpl?: PlaylistImpl;
  useUserImpl?: UserImpl;
};

export type PlaylistSugestionViewModel = (
  props: HookProps,
) => ReturnType<typeof usePlaylistSugestion>;
