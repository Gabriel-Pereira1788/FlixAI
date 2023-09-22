import {QUERY_KEYS} from '@constants';
import {useFetch} from '@infra';

import {MoviesService} from '../moviesService';

export function useGetAllMovies() {
  const {data, isLoading, error} = useFetch({
    queryKey: [QUERY_KEYS.allMovies],
    queryFn: () => MoviesService.getMoviesList(),
    options: {
      refetchOnMount: false,
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}

export type GetAllMoviesImpl = ReturnType<typeof useGetAllMovies>;
