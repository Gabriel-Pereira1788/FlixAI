import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../../../../repositories/services/api/modules/movies/movies';
import {QUERY_KEYS} from '../../../../../helpers/constants/queryKeys';

import {CreatePlaylistViewModel} from './model';
import {PlaylistDTO} from '../../../../../models/Playlist';
import {modalRef} from '../../../../../components/Modal/View';
import {useSelectedMoviesStore as _useSelectedMoviesStore} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {usePlaylist as _usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';
import React from 'react';

export const useCreatePlaylist: CreatePlaylistViewModel = ({
  useSelectedMoviesStore = _useSelectedMoviesStore,
  usePlaylist = _usePlaylist,
}) => {
  const {
    state: {selectedMovies},
    cleanUp,
  } = useSelectedMoviesStore();
  const {create} = usePlaylist();

  const {data, isLoading} = useQuery(
    [QUERY_KEYS.popularMovies],
    () => MoviesApi.getByGenre('popular'),
    {
      refetchOnMount: false,
    },
  );

  const [titlePlaylist, setTitlePlaylist] = React.useState('');

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
