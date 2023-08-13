import {QUERY_KEYS} from '@constants';
import {MoviesService} from '@domain';
import {useFetch} from '@infra';

export const useAllMovies = () => {
  const {data, isLoading, error} = useFetch({
    queryKey: [QUERY_KEYS.allMovies],
    queryFn: () => MoviesService.getMoviesList(),
    options: {
      refetchOnMount: false,
    },
  });

  return {data, isLoading, error};
};

export type AllMoviesImpl = () => ReturnType<typeof useAllMovies>;
