import React from 'react';
import {useAllMovies} from '../../../store/server/useAllMovies';
import {SelectMoviesViewModel} from './model';
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';
import {PlaylistDTO} from '../../../models/Playlist';
import {useSelectedMoviesStore} from '../../../store/client/useSelectedMoviesStore';
import {modalRef} from '../../../components/Modal/View';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../../helpers/constants/queryKeys';

export const _useSelectMovies: SelectMoviesViewModel = ({navigation}) => {
  const {focused} = useFocusedScreen();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = React.useState('');
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

  function handleChange(value: string) {
    setSearchText(value);
  }
  /*
  React.useEffect(() => {
    if (!focused) {
      queryClient.removeQueries([QUERY_KEYS.allMovies]);
    }
  }, [focused, queryClient]);
 */
  return {
    dataMovies: focused ? data : [],
    searchText,
    loading: isLoading,
    selectedMovies: state.selectedMovies,
    addToSelected: addToSelected,
    handleChange,
    onCreate,
  };
};
