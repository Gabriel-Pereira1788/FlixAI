import React from 'react';
import {TMDB_GENRES} from '../../../helpers/constants/tmdb';
import {MoviesViewModel} from './model';
import {useAllMovies} from '../../../store/server/useAllMovies';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';

export const _useMovies: MoviesViewModel = () => {
  const {data, isLoading} = useAllMovies();
  //const queryClient = useQueryClient();
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

  /*   React.useEffect(() => {
    if (!focused) {
      queryClient.removeQueries([QUERY_KEYS.allMovies]);
    }
  }, [focused, queryClient]); */

  return {
    dataMovies: focused ? data : [],
    isLoading,
    categories: [{name: 'Todos', identify: 'all', id: 1}, ...categories],
    filter,
    handleFilter,
  };
};
