import React from 'react';
import {usePlaylist as _usePlaylist} from '@database';
import {LibraryDTO} from '@models';
import {
  useSelectedMoviesStore as _useSelectedMoviesStore,
  useAllMovies as _useAllMovies,
} from '@store';
import {modalRef} from '@components';
import {useFocusedScreen} from '@hooks';

import {HookProps} from './model';

export const _useSelectMovies = ({
  navigation,
  useSelectedMoviesStore = _useSelectedMoviesStore,
  usePlaylist = _usePlaylist,
  useAllMovies = _useAllMovies,
}: HookProps) => {
  const {state, addToSelected, cleanUp} = useSelectedMoviesStore();
  const {data, isLoading, error} = useAllMovies();
  const {create} = usePlaylist();

  const [searchText, setSearchText] = React.useState('');
  const {focused} = useFocusedScreen();

  async function onCreate(dataPlaylist: LibraryDTO) {
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
    error,
    loading: isLoading,
    selectedMovies: state.selectedMovies,
    addToSelected: addToSelected,
    handleChange,
    onCreate,
  };
};
