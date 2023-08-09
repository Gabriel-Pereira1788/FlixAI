import {Movie} from '@models';

export type ApiMessage = {
  role: string;
  content: string;
};

export interface BodyDTO {
  model: string;
  messages: ApiMessage[];
  temperature: number;
  max_tokens: number;
}

export interface SuggestionServiceImpl {
  getResponseAssistant(text: string): Promise<{
    text?: string;
    listSuggestions: string[];
  } | null>;
  adapters: SuggestionsAdaptersImpl;
}

export interface SuggestionsAdaptersImpl {
  toMoviesApiList<DataMovie extends Movie>(movies: DataMovie[]): Movie[];
  toStringMoviesList(response: string): {
    result: string[];
    text: string | undefined;
  };
  toApiMessages(message: string): ApiMessage;
}
