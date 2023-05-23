import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../repositories/services/api/modules/movies/movies';

export function useMoviesByGenre(genre?: GenreIdentify) {
  const {data, isLoading, error} = useQuery(
    [`@${genre}`],
    () => MoviesApi.getByGenre(genre),
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
