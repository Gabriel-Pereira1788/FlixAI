import {MoviesService} from '@domain';
import {useQuery} from '@tanstack/react-query';

export function useMoviesByGenre(genre?: GenreIdentify) {
  const {data, isLoading, error} = useQuery(
    [`@${genre}`],
    () => MoviesService.getByGenre(genre),
    {
      refetchOnMount: false,
    },
  );

  return {
    data,
    isLoading,
    error,
  };
}

export type MoviesByGenreImpl = (
  genre?: GenreIdentify,
) => ReturnType<typeof useMoviesByGenre>;
