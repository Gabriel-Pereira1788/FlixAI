import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../repositories/services/api/modules/movies/movies';

export function useMoviesByGenre(genre?: GenreIdentify) {
  const {data, isLoading, error} = useQuery([`@${genre}`], () =>
    MoviesApi.getByGenre(genre),
  );

  return {
    data,
    isLoading,
    error,
  };
}
