import React from 'react';

import {CreateLibraryView} from './CreateLibrary.view';
import {useCreateLibraryViewModel} from './CreateLibrary.viewModel';
import {CreateLibraryProps} from './types';

type Props = Omit<CreateLibraryProps, 'viewModel'>;

export function CreateLibraryController({moviesListToAdd}: Props) {
  const viewModel = useCreateLibraryViewModel(moviesListToAdd);
  return (
    <CreateLibraryView
      moviesListToAdd={moviesListToAdd}
      viewModel={viewModel}
    />
  );
}
