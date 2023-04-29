import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../../../../repositories/services/api/modules/movies/movies';
import {QUERY_KEYS} from '../../../../../helpers/constants/queryKeys';

import {CreatePlaylistViewModel} from './model';
import {PlaylistDTO} from '../../../../../models/Playlist';
import {modalRef} from '../../../../../components/Modal/View';
import {useSelectedMoviesStore} from '../../../../../store/client/useSelectedMoviesStore';
import {usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';
import React from 'react';

export const useCreatePlaylist: CreatePlaylistViewModel = () => {
  const {data, isLoading} = useQuery(
    [QUERY_KEYS.popularMovies],
    () => MoviesApi.getByGenre('popular'),
    {
      refetchOnMount: false,
    },
  );

  const [titlePlaylist, setTitlePlaylist] = React.useState('');

  const {
    actions: {cleanUp},
    state: {selectedMovies},
  } = useSelectedMoviesStore();

  const {create} = usePlaylist();

  async function onCreate(dataPlaylist: PlaylistDTO) {
    await create(dataPlaylist);
    modalRef.current?.hide();
    cleanUp();
  }

  async function handleCreate() {
    await onCreate({
      title: titlePlaylist,
      movies: selectedMovies,
    });
  }

  function handleChangeText(value: string) {
    setTitlePlaylist(value);
  }
  return {
    titlePlaylist,
    popularMovies: data,
    loading: isLoading,
    handleCreate,
    handleChangeText,
  };
};
