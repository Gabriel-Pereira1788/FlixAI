import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';
import {PlaylistStoreImpl} from '../../../store/client/PlaylistStore/usePlaylistStore';
import {useUserLibrary} from './useUserLibrary';

export type HookProps = {
  usePlaylistStore?: PlaylistStoreImpl;
  useCasePlaylist?: PlaylistImpl;
};

export type UserLibraryViewModel = (
  props: HookProps,
) => ReturnType<typeof useUserLibrary>;
