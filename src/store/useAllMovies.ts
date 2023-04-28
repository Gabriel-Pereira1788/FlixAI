import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '../helpers/constants/queryKeys';
import {MoviesApi} from '../repositories/services/api/modules/movies/movies';

export const useAllMovies = () => {
  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.allMovies],
    () => MoviesApi.getMoviesList(),
    {
      refetchOnMount: false,
    },
  );

  return {data, isLoading, error};
};
