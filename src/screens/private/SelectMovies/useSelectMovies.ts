import React from 'react';
import {useAllMovies} from '../../../store/useAllMovies';
import {SelectMoviesViewModel} from './model';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../helpers/constants/queryKeys';

export const _useSelectMovies: SelectMoviesViewModel = ({navigation}) => {
  const [focus, setFocus] = React.useState(false);
  const queryClient = useQueryClient();
  const {data, isLoading} = useAllMovies();
  console.log('focus', focus);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setFocus(true);
    });
    navigation.addListener('blur', () => {
      setFocus(false);
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.allMovies],
      });
    });
  }, [navigation, queryClient]);
  return {
    dataMovies: focus ? data : [],
    loading: isLoading,
  };
};
