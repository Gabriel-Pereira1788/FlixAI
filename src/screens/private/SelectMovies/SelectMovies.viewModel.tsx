import React from 'react';

import {usePlaylist} from '@database';
import {LibraryDTO} from '@models';
import {useIsFocused} from '@react-navigation/native';
import {useAllMovies, useSelectedMoviesActions} from '@store';

import {modalRef} from '@components';

import {HookProps} from './types';

export const useSelectMoviesViewModel = ({navigation}: HookProps) => {
  const {cleanUp} = useSelectedMoviesActions();
  const {data, isLoading, error} = useAllMovies();
  const libraryQuery = usePlaylist();

  const [searchText, setSearchText] = React.useState('');
  const focused = useIsFocused();

  async function onCreate(dataPlaylist: LibraryDTO) {
    await libraryQuery.create(dataPlaylist);
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
    handleChange,
    onCreate,
  };
};
