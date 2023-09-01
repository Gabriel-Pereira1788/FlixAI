import React from 'react';

import {NavigationProps} from '../../../router/navigation';

import SingleMovie from './SingleMovie.view';
import {useSingleMovieViewModel} from './SingleMovie.viewModel';

interface Props extends NavigationProps<'SingleMovie'> {}

export function SingleMovieViewController({route}: Props) {
  const {idMovie} = route.params;

  const viewModel = useSingleMovieViewModel(idMovie);
  return <SingleMovie viewModel={viewModel} />;
}
