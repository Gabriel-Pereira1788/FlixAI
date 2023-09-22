import React from 'react';

import {TMDB_GENRES} from '@constants';
import {useGetAllMovies} from '@domain';
import {Genre} from '@models';
import {useIsFocused} from '@react-navigation/native';

// import {useFocusedScreen} from '@hooks';

const categories = TMDB_GENRES.filter(genre => !!genre.identify);

export const useMoviesViewModel = () => {
  const {data, isLoading, error} = useGetAllMovies();
  // const {focused} = useFocusedScreen();
  const focused = useIsFocused();
  const [filter, setFilter] = React.useState<Filter>({
    text: '',
    category: 'all',
  });

  function handleFilter(filterData: Filter) {
    setFilter(prev => ({...prev, ...filterData}));
  }

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
