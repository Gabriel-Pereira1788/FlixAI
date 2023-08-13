import React from 'react';

import Movies from './Movies.view';
import {useMoviesViewModel} from './Movies.viewModel';

type Props = {};

export function MoviesViewController({}: Props) {
  const viewModel = useMoviesViewModel();
  return <Movies viewModel={viewModel} />;
}
