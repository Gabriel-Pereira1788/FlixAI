import React from 'react';

import {usePlaylist} from '@database';
import {useAlertStore} from '@store';

import {modalRef} from '@components';

import {CreateLibraryProps} from './types';

export function useCreateLibraryViewModel(
  moviesListToAdd: CreateLibraryProps['moviesListToAdd'],
) {
  const [titleLibrary, setTitleLibrary] = React.useState('');
  const {create} = usePlaylist();
  const {warning} = useAlertStore();

  function handleChangeTitleLibrary(text: string) {
    setTitleLibrary(text);
  }

  async function handleCreateLibrary() {
    if (titleLibrary.trim() === '') {
      warning('Por favor preencha todos os campos.');

      return;
    }
    await create({
      title: titleLibrary,
      movies: moviesListToAdd,
    });

    modalRef.current?.hide();
  }

  return {
    titleLibrary,
    handleChangeTitleLibrary,
    handleCreateLibrary,
  };
}
