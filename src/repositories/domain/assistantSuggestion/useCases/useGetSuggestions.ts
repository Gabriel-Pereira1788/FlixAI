import {QUERY_KEYS} from '@constants';
import {_useKeywordsGpt} from '@database';
import {useFetch} from '@infra';
import {toValidKeyWords} from '@utils';

import {MoviesService} from '../../movies';
import {AssistantSuggestionService} from '../assistantSuggestionService';

import {HookProps} from './model';

const assistantSuggestionService = new AssistantSuggestionService();
export function useGetSuggestions({
  useKeywordsImpl = _useKeywordsGpt,
  searchText,
}: HookProps) {
  const keywordsImpl = useKeywordsImpl();

  async function fetchMoviesSuggestions(searchText: string) {
    console.log('search-text', searchText);
    if (searchText.trim().length === 0) {
      return null;
    }
    const keywords = toValidKeyWords(searchText);
    const databaseResponse = await fetchDatabaseSuggestions(keywords);
    const alreadyExistsInDatabase = !!databaseResponse;

    if (alreadyExistsInDatabase) {
      return databaseResponse;
    } else {
      const assistantResponse = await fetchAssistantSuggestions(searchText);

      if (assistantResponse !== null) {
        await keywordsImpl.create({
          keywords: `${keywords}`,
          movies: assistantResponse.movies,
          text: assistantResponse.text ?? '',
        });
      }
      return assistantResponse;
    }
  }

  async function fetchDatabaseSuggestions(keywords: string[]) {
    const response = keywordsImpl.matchDatabaseKeywords(keywords);
    if (response.length > 0) {
      const {movies, text} = response[0];

      const moviesList =
        assistantSuggestionService.adapters.toMoviesApiList(movies);

      return {
        movies: moviesList,
        text,
      };
    }

    return null;
  }

  async function fetchAssistantSuggestions(searchText: string) {
    const response = await assistantSuggestionService.getResponseAssistant(
      searchText,
    );

    if (response?.listSuggestions && response.listSuggestions.length > 0) {
      const movies = await MoviesService.getAllByName(
        response?.listSuggestions,
      );

      return {text: response?.text, movies};
    }

    return null;
  }

  const {data, isLoading, error} = useFetch({
    queryKey: [QUERY_KEYS.suggestions, searchText.trim()],
    queryFn: () => fetchMoviesSuggestions(searchText),
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}

export type AssistantSuggestionServiceImpl = ReturnType<
  typeof useGetSuggestions
>;
