import React from 'react';
import {TMDB_GENRES} from '../../../helpers/constants/tmdb';

import {useAllMovies} from '../../../store/server/useAllMovies';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';
import {Genre} from '../../../models/Movie';

export const _useMovies = () => {
  const {data, isLoading, error} = useAllMovies();
  const {focused} = useFocusedScreen();
  const [filter, setFilter] = React.useState<Filter>({
    text: '',
    category: 'all',
  });

  const categories = TMDB_GENRES.filter(genre => !!genre.identify);

  function handleFilter(filterData: Filter) {
    setFilter(prev => ({...prev, ...filterData}));
  }

  console.log(filter);

  return {
    dataMovies: focused ? data : [],
    isLoading,
    categories: [
      {name: 'Todos', identify: 'all', id: 1} as Genre,
      ...categories,
    ],
    filter,
    error,
    handleFilter,
  };
};
