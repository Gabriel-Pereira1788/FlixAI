import React from 'react';

import {useMoviesByGenre} from '@store';

import {modalRef} from '@components';

import {NewLibrary} from './NewLibrary.view';
import {useNewLibraryViewModel} from './NewLibrary.viewModel';

type Props = {
  redirectToSelectMovies: () => void;
};

export function NewLibraryViewController({redirectToSelectMovies}: Props) {
  const viewModel = useNewLibraryViewModel({});
  const {data} = useMoviesByGenre('popular');

  function handleRedirectScreen() {
    modalRef.current?.hide();
    redirectToSelectMovies();
  }

  return (
    <NewLibrary
      viewModel={viewModel}
      handleRedirectScreen={handleRedirectScreen}
      popularMovies={data ?? []}
    />
  );
}
