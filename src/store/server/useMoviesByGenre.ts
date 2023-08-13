import {MoviesService} from '@domain';
import {useFetch} from '@infra';

export function useMoviesByGenre(genre?: GenreIdentify) {
  const {data, isLoading, error} = useFetch({
    queryKey: [`@${genre}`],
    queryFn: () => MoviesService.getByGenre(genre),
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

export type MoviesByGenreImpl = (
  genre?: GenreIdentify,
) => ReturnType<typeof useMoviesByGenre>;
