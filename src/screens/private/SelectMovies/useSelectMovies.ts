import React from 'react';
import {useAllMovies as _useAllMovies} from '../../../store/server/useAllMovies';
import {SelectMoviesViewModel} from './model';
import {usePlaylist as _usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';
import {PlaylistDTO} from '../../../models/Playlist';
import {useSelectedMoviesStore as _useSelectedMoviesStore} from '../../../store/client/SelectMovies/useSelectedMoviesStore';
import {modalRef} from '../../../components/Modal/View';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';

export const _useSelectMovies: SelectMoviesViewModel = ({
  navigation,
  useSelectedMoviesStore = _useSelectedMoviesStore,
  usePlaylist = _usePlaylist,
  useAllMovies = _useAllMovies,
}) => {
  const {state, addToSelected, cleanUp} = useSelectedMoviesStore();
  const {data, isLoading} = useAllMovies();
  const {create} = usePlaylist();

  const [searchText, setSearchText] = React.useState('');
  const {focused} = useFocusedScreen();

  async function onCreate(dataPlaylist: PlaylistDTO) {
    await create(dataPlaylist);
    modalRef.current?.hide();
    cleanUp();
    navigation.goBack();
  }

  function handleChange(value: string) {
    setSearchText(value);
  }

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
