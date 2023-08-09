import {QUERY_KEYS} from '@constants';
import {MoviesService} from '@domain';
import {useQuery} from '@tanstack/react-query';

export function useSingleMovieServer(id: number | string) {
  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.singleMovie, id],
    () => MoviesService.findById(id),
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
