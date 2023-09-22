import {QUERY_KEYS} from '@constants';
import {MoviesService} from '@domain';
import {useFetch} from '@infra';

export function useGetSingleMovie(id: number | string) {
  const {data, isLoading, error} = useFetch({
    queryKey: [QUERY_KEYS.singleMovie, String(id)],
    queryFn: () => MoviesService.findById(id),
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}

export type SingleMovieImpl = (
  id: number | string,
) => ReturnType<typeof useGetSingleMovie>;
