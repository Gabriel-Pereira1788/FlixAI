import React from 'react';

import {HookProps} from './model';

import {modalRef} from '../../../../../components/Modal/View';

import {useSelectedMoviesStore as _useSelectedMoviesStore} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';

import {usePlaylist as _usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';

import {useMoviesByGenre} from '../../../../../store/server/useMoviesByGenre';

export const useNewLibrary = ({
  useSelectedMoviesStore = _useSelectedMoviesStore,
  usePlaylist = _usePlaylist,
  useMoviesByGenreImpl = useMoviesByGenre,
}: HookProps) => {
  const {
    state: {selectedMovies},
    cleanUp,
  } = useSelectedMoviesStore();
  const {create} = usePlaylist();

  const {data, isLoading} = useMoviesByGenreImpl('popular');

  const [titleLibrary, setTitleLibrary] = React.useState('');

  async function createLibrary() {
    await create({
      title: titleLibrary,
      movies: selectedMovies,
    });
    modalRef.current?.hide();
    cleanUp();
  }

  function handleChangeText(value: string) {
    setTitleLibrary(value);
  }
  return {
    titleLibrary,
    popularMovies: data,
    loading: isLoading,
    createLibrary,
    handleChangeText,
  };
};
