import {Realm} from '@realm/react';

import {Movie} from '../../../../../models/Movie';
import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';

import {useAddModal} from './useAddModal';

export type HookProps = {
  movie: Movie;
  usePlaylistImpl?: PlaylistImpl;
  useRealmImpl?: () => Realm;
};

export type AddModalViewModel = (
  props: HookProps,
) => ReturnType<typeof useAddModal>;
