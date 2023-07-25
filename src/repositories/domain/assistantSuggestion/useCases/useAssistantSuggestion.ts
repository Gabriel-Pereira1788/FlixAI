import {toValidKeyWords} from '@utils';
import {_useKeywordsGpt, KeywordsGptImpl} from '@database';
import {AssistantSuggestionService} from '../assistantSuggestionService';
import {MoviesService} from '../../movies';

const assistantSuggestionService = new AssistantSuggestionService();

type Props = {
  useKeywordsImpl?: KeywordsGptImpl;
};
export function useAssistantSuggestion({
  useKeywordsImpl = _useKeywordsGpt,
}: Props) {
  const keywordsImpl = useKeywordsImpl();

  async function fetchMoviesSuggestions(searchText: string) {
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

  return {
    fetchMoviesSuggestions,
  };
}

export type AssistantSuggestionServiceImpl = (
  props: Props,
) => ReturnType<typeof useAssistantSuggestion>;