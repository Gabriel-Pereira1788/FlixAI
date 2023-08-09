import {Realm} from '@realm/react';

import {Movie} from '../../../../../models/Movie';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';

import {useRemoveModal} from './useRemoveModal';

export interface HookProps {
  movie: Movie;
  playlist: Playlist[];
  useRealmImpl?: () => Realm;
}
export type RemoveModalViewModel = (
  props: HookProps,
) => ReturnType<typeof useRemoveModal>;
