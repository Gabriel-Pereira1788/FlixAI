import React from 'react';

import {useUser} from '@store';

import {MoviesSuggestionView} from './MoviesSuggestions.view';
import {useMoviesSuggestionViewModel} from './MoviesSuggestions.viewModel';

type Props = {};

export function MoviesSuggestionViewController({}: Props) {
  const {user} = useUser();
  const viewModel = useMoviesSuggestionViewModel();

  return (
    <MoviesSuggestionView username={user?.name ?? ''} viewModel={viewModel} />
  );
}
