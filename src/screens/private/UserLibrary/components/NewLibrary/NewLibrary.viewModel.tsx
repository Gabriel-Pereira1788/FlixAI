import {usePlaylist} from '@database';
import {useSelectedMoviesStore} from '@store';

import {HookProps} from './types';

export const useNewLibraryViewModel = ({}: HookProps) => {
  const {
    state: {selectedMovies},
    cleanUp,
  } = useSelectedMoviesStore();
  const {create} = usePlaylist();

  async function onCreateLibrary(titleLibrary: string) {
    if (titleLibrary.trim().length === 0) {
      return;
    }
    await create({
      title: titleLibrary,
      movies: selectedMovies,
    });

    cleanUp();
  }

  return {
    onCreateLibrary,
  };
};
