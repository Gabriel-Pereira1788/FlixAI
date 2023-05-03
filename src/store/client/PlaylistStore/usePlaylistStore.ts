import {useStore} from './Store';

export const usePlaylistStore = () => {
  const {
    actions: {cleanUp, selectPlaylist},
    state,
  } = useStore();
  return {
    state,
    cleanUp,
    selectPlaylist,
  };
};

export type PlaylistStoreImpl = () => ReturnType<typeof usePlaylistStore>;
