import {Movie} from '@models';

import {ApiMessage, SuggestionsAdaptersImpl} from './model';

export class AssistantSuggestionAdapters implements SuggestionsAdaptersImpl {
  toMoviesApiList<DataMovie extends Movie>(movies: DataMovie[]): Movie[] {
    return movies.map(dataMovie => ({
      backdrop_path: dataMovie.backdrop_path,
      genre_ids: dataMovie.genre_ids,
      id: dataMovie.id,
      imdb_id: dataMovie.imdb_id,
      name: dataMovie.name,
      original_title: dataMovie.original_title,
      overview: dataMovie.overview,
      poster_path: dataMovie.poster_path,
      release_date: dataMovie.release_date,
      title: dataMovie.title,
      vote_average: dataMovie.vote_average,
      vote_count: dataMovie.vote_count,
      cast: dataMovie.cast,
      genres: dataMovie.genres,
      homepage: dataMovie.homepage,
    }));
  }

  toStringMoviesList(response: string) {
    const newData = response.split('\n');
    const text = newData.shift();

    const result = newData.map(movie => {
      const data = movie.slice(2, movie.length);
      return data.trim();
    });

    return {
      result,
      text,
    };
  }

  toApiMessages(message: string): ApiMessage {
    return {
      role: 'user',
      content: message,
    };
  }
}
