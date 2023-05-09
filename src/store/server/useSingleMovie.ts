import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../repositories/services/api/modules/movies/movies';

export function useSingleMovieServer(id: number | string) {
  const {data, isLoading, error} = useQuery(
    ['singleMovie', id],
    () => MoviesApi.findById(id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return {
    data,
    isLoading,
    error,
  };
}

export type SingleMovieImpl = (
  id: number | string,
) => ReturnType<typeof useSingleMovieServer>;
