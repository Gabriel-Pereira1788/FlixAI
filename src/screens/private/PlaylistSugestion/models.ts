import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';

import {SugestionsImpl} from '../../../store/server/useSugestions';
import {usePlaylistSugestion} from './usePlaylistSugestion';

export type HookProps = {
  useSugestions?: SugestionsImpl;
  usePlaylistImpl?: PlaylistImpl;
};

export type PlaylistSugestionViewModel = (
  props: HookProps,
) => ReturnType<typeof usePlaylistSugestion>;
