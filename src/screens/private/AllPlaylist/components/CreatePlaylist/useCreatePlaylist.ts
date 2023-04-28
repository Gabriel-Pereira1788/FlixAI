import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../../../../repositories/services/api/modules/movies/movies';
import {QUERY_KEYS} from '../../../../../helpers/constants/queryKeys';

import {CreatePlaylistViewModel} from './model';

export const useCreatePlaylist: CreatePlaylistViewModel = () => {
  const {data, isLoading} = useQuery(
    [QUERY_KEYS.popularMovies],
    () => MoviesApi.getByGenre('popular'),
    {
      refetchOnMount: false,
    },
  );

  return {
    popularMovies: data,
    loading: isLoading,
  };
};
