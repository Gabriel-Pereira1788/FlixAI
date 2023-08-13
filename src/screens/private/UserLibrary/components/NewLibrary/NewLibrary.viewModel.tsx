import {usePlaylist} from '@database';
import {useSelectedMoviesActions, useSelectedMoviesStore} from '@store';

import {HookProps} from './types';

export const useNewLibraryViewModel = ({}: HookProps) => {
  const {cleanUp} = useSelectedMoviesActions();
  const selectedMovies = useSelectedMoviesStore();
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
