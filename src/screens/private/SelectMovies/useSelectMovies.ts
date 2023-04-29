import React from 'react';
import {useAllMovies} from '../../../store/server/useAllMovies';
import {SelectMoviesViewModel} from './model';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../helpers/constants/queryKeys';
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';
import {PlaylistDTO} from '../../../models/Playlist';
import {useSelectedMoviesStore} from '../../../store/client/useSelectedMoviesStore';
import {modalRef} from '../../../components/Modal/View';

export const _useSelectMovies: SelectMoviesViewModel = ({navigation}) => {
  const queryClient = useQueryClient();
  const [focus, setFocus] = React.useState(false);
  const {data, isLoading} = useAllMovies();

  const {
    state,
    actions: {addToSelected, cleanUp},
  } = useSelectedMoviesStore();

  const {create} = usePlaylist();

  async function onCreate(dataPlaylist: PlaylistDTO) {
    await create(dataPlaylist);
    modalRef.current?.hide();
    cleanUp();
    navigation.goBack();
  }

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
    selectedMovies: state.selectedMovies,
    addToSelected: addToSelected,
    onCreate,
  };
};
