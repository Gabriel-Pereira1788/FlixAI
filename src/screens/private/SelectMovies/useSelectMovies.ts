import React from 'react';
import {useAllMovies} from '../../../store/useAllMovies';
import {SelectMoviesViewModel} from './model';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../helpers/constants/queryKeys';
import {useSelectedMoviesContext} from '../../../providers/modules/SelectedMoviesProvider';

export const _useSelectMovies: SelectMoviesViewModel = ({navigation}) => {
  const queryClient = useQueryClient();
  const [focus, setFocus] = React.useState(false);
  const {data, isLoading} = useAllMovies();

  const {addToSelected, selectedMovies} = useSelectedMoviesContext();

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
    addToSelected,
    selectedMovies,
  };
};
