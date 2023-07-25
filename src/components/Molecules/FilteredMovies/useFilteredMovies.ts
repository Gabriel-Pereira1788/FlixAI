import React from 'react';
import {FilteredMoviesViewModel} from './model';
import {useMoviesByGenre} from '../../../store/server/useMoviesByGenre';
import {uniqueObjectList} from '../../../helpers/utils/uniqueObjectList';
import {Movie} from '../../../models/Movie';

export const useFilteredMovies: FilteredMoviesViewModel = ({
  movies,
  filter,
  useMoviesByGenreImpl = useMoviesByGenre,
}) => {
  const {data: dataMoviesGenre} = useMoviesByGenreImpl(filter.category);

  const filteredAllMovies = React.useMemo(() => {
    if (movies) {
      const dataFiltered = movies.reduce((acc, data) => {
        acc = [...acc, ...data.list];
        return acc;
      }, [] as Movie[]);

      return uniqueObjectList(dataFiltered, 'title');
    }

    return [];
  }, [movies]);
  const displayMovies = React.useMemo(() => {
    let filteredMovies =
      filter.category === 'all' ? filteredAllMovies : dataMoviesGenre || [];
    if (filter.text && filter.text.trim() !== '') {
      filteredMovies =
        filteredMovies.length > 0
          ? filteredMovies.filter(movie =>
              movie.title.toLowerCase().includes(filter.text!.toLowerCase()),
            )
          : [];
    }

    return filteredMovies;
  }, [dataMoviesGenre, filter, filteredAllMovies]);

  return {displayMovies};
};
