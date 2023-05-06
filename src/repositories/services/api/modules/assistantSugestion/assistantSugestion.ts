import {extractKeyWords} from '../../../../../helpers/utils/extractKeyWords';
import {formatListMovies} from '../../../../../helpers/utils/formatListMovies';
import {Movie} from '../../../../../models/Movie';
import {DataSugestion} from '../../../../../models/Sugestion';
import {KeywordsGptImpl} from '../../../../database/useCases/KeywordsGpt/model';
import {GPTAssistant} from '../../../GPT';
import {Movies} from '../movies/movies';

const list = ` Claro, aqui estão algumas sugestões de filmes de ação:s
1. Duro de Matar
2. Mad Max: Estrada da Fúria
3. John Wick: De Volta ao Jogo
4. Velozes e Furiosos 7
5. Kill Bill: Volume 1
6. Matrix
7. O Exterminador do Futuro 2: O Julgamento Final
8. Missão Impossível: Protocolo Fantasma`;

export class AssistantSugestion {
  private gpt = new GPTAssistant();
  private movies = new Movies();
  private keywordsGpt?: ReturnType<KeywordsGptImpl>;

  private normalizeDataMovies(movies: Movie[]): Movie[] {
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

  private async matchDatabaseKeywords(
    keywords: string[],
  ): Promise<{text?: string; movies: Movie[]} | null> {
    console.log('words', keywords);
    const findData = this.keywordsGpt!.get().filtered(`keywords="${keywords}"`);

    if (findData.length > 0) {
      const movies = this.normalizeDataMovies(findData[0].movies);

      console.log('finded with database');
      return {
        text: findData[0].text,
        movies: movies,
      };
    }

    return null;
  }

  private async getResponseAssistant(
    text: string,
  ): Promise<{text?: string; movies: Movie[]} | null> {
    const responseAssistant = await this.gpt.listenResponse(text);
    if (responseAssistant) {
      const data = formatListMovies(responseAssistant!);

      const movies = await this.movies.getAllByName(data.result);
      console.log('finded with gpt');
      return {
        text: data.text,
        movies: movies.length > 0 ? movies : [],
      };
    }
    return null;
  }

  async getSugestions(
    metaData: DataSugestion,
    keywordsGpt: ReturnType<KeywordsGptImpl>,
  ): Promise<{text?: string; movies: Movie[]} | null> {
    this.keywordsGpt = keywordsGpt;

    if (metaData.text.trim() === '') {
      return null;
    }
    const words = extractKeyWords(metaData.text);
    const responseDatabase = await this.matchDatabaseKeywords(words);

    if (responseDatabase) {
      return responseDatabase;
    } else {
      const responseAssistant = await this.getResponseAssistant(metaData.text);
      if (responseAssistant && responseAssistant.movies.length > 0) {
        await this.keywordsGpt.create({
          keywords: `${words}`,
          movies: responseAssistant.movies,
          text: responseAssistant.text!,
        });
      }

      return responseAssistant;
    }
  }
}
