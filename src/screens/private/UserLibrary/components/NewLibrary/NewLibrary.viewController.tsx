import React from 'react';

import {useMoviesByGenre} from '@store';

import {NewLibrary} from './NewLibrary.view';
import {useNewLibraryViewModel} from './NewLibrary.viewModel';

type Props = {};

export function NewLibraryViewController({}: Props) {
  const viewModel = useNewLibraryViewModel({});
  const {data} = useMoviesByGenre('popular');

  return <NewLibrary viewModel={viewModel} popularMovies={data ?? []} />;
}
