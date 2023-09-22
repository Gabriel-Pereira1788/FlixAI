import React from 'react';

import {RenderIF, SharedLayout} from '@components';

import {
  MoviesSuggestionsCreateLibrary,
  MoviesSuggestionsHeader,
  MoviesSuggestionsList,
} from './components';
import {MoviesSugestionViewModel} from './types';

type Props = {
  username: string;
  viewModel: MoviesSugestionViewModel;
};

export function MoviesSuggestionView({viewModel, username}: Props) {
  const {moviesList, message, isLoading, error, listenEventSearch} = viewModel;

  return (
    <SharedLayout
      error={error}
      isLoadingData={isLoading}
      HeaderComponent={
        <MoviesSuggestionsHeader
          listenEventSearch={listenEventSearch}
          title={message || `Olá ${username} oque precisa para hoje?`}
        />
      }>
      <RenderIF condition={!isLoading && !!moviesList && moviesList.length > 0}>
        <MoviesSuggestionsList list={moviesList} />
        <MoviesSuggestionsCreateLibrary moviesList={moviesList} />
      </RenderIF>
    </SharedLayout>
  );
}
