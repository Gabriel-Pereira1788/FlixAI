import {QUERY_KEYS} from '@constants';
import {MoviesService} from '@domain';
import {useQuery} from '@tanstack/react-query';

export const useAllMovies = () => {
  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.allMovies],
    () => MoviesService.getMoviesList(),
    {
      refetchOnMount: false,
    },
  );

  return {data, isLoading, error};
};

export type AllMoviesImpl = () => ReturnType<typeof useAllMovies>;
