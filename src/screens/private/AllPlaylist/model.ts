import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';
import {PlaylistStoreImpl} from '../../../store/client/PlaylistStore/usePlaylistStore';
import {useAllPlaylist} from './useAllPlaylist';

export type HookProps = {
  usePlaylistStore?: PlaylistStoreImpl;
  useCasePlaylist?: PlaylistImpl;
};

export type AllPlaylistViewModel = (
  props: HookProps,
) => ReturnType<typeof useAllPlaylist>;
