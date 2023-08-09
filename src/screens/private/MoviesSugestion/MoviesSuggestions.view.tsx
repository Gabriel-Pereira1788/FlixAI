import React from 'react';

import {RenderIF, BottomTab, SharedLayout} from '@components';

import {
  MoviesSuggestionsCreateLibrary,
  MoviesSuggestionsHeader,
  MoviesSuggestionsList,
} from './components';
import {ViewProps} from './types';

export function MoviesSuggestionView({viewModel, username}: ViewProps) {
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
      }
      BottomComponent={<BottomTab currentPath="sugestions" />}>
      <RenderIF condition={!isLoading && !!moviesList && moviesList.length > 0}>
        <MoviesSuggestionsList list={moviesList} />
        <MoviesSuggestionsCreateLibrary moviesList={moviesList} />
      </RenderIF>
    </SharedLayout>
  );
}
