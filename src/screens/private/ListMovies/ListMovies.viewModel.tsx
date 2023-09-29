import React from 'react';

import {Collection} from '@database';
import {useDatabase} from '@infra';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useToastActions} from '@store';
import {logger} from '@utils';

import {modalRef} from '@components';

import {ListMoviesConfirmDelete} from './components/ListMoviesConfirmDelete';

export const useListMoviesViewModel = (
  library: (Collection & Realm.Object<Collection, never>) | null,
) => {
  const database = useDatabase();
  const toast = useToastActions();
  const focused = useIsFocused();

  const navigation = useNavigation();

  const [searchText, setSearchText] = React.useState('');

  const displayMovies = React.useMemo(() => {
    let listMovies = library ? library.movies : [];

    if (searchText.trim() !== '' && listMovies.length > 0) {
      listMovies = listMovies.filter(movie => {
        const normalizedSearchText = searchText.toLowerCase();
        const normalizedMovieTitle = movie.title.toLowerCase();

        return normalizedMovieTitle.startsWith(normalizedSearchText);
      });
    }

    return library && focused ? listMovies : [];
  }, [library, focused, searchText]);

  function handleOnSearch(value: string) {
    setSearchText(value);
  }

  function openModalConfirmation() {
    modalRef.current?.show(
      <ListMoviesConfirmDelete
        library={library}
        onConfirmation={onConfirmation}
      />,
    );
  }

  function onConfirmation() {
    try {
      database.deleteItem(library);
      toast.success('Biblioteca apagada...');
      navigation.goBack();
    } catch (error) {
      logger.log('error on delete library', error);
      toast.error('Algo deu errado ao deletar a biblioteca...');
    } finally {
      modalRef.current?.hide();
    }
  }

  return {
    moviesList: displayMovies,
    handleOnSearch,
    openModalConfirmation,
  };
};
