import {AssistantSuggestionServiceImpl} from '@domain';

import {useMoviesSuggestionViewModel} from './MoviesSuggestions.viewModel';

export type HookProps = {
  fetchMoviesSuggestions: ReturnType<AssistantSuggestionServiceImpl>['fetchMoviesSuggestions'];
};

export type MoviesSugestionViewModel = ReturnType<
  typeof useMoviesSuggestionViewModel
>;

export type ViewProps = {
  username: string;
  viewModel: MoviesSugestionViewModel;
};
