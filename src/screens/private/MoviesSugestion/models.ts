import {AssistantSuggestionServiceImpl} from '@domain';
import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';

import {UserImpl} from '../../../store/server/useUser';
import {useMoviesSugestion} from './useMoviesSugestion';

export type HookProps = {
  usePlaylistImpl?: PlaylistImpl;
  useUserImpl?: UserImpl;
  useAssistantSuggestionImpl?: AssistantSuggestionServiceImpl;
};

export type MoviesSugestionViewModel = (
  props: HookProps,
) => ReturnType<typeof useMoviesSugestion>;
