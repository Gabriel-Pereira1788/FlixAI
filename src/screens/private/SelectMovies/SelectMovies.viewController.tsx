import React from 'react';

import {NavigationProps} from '../../../router/navigation';

import SelectMovies from './SelectMovies.view';
import {useSelectMoviesViewModel} from './SelectMovies.viewModel';

interface Props extends NavigationProps<'SelectMovies'> {}

export function SelectMoviesViewController({navigation}: Props) {
  const viewModel = useSelectMoviesViewModel({
    navigation,
  });
  return <SelectMovies viewModel={viewModel} />;
}
