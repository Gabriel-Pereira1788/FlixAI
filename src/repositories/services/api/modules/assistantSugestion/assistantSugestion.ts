import {extractKeyWords} from '../../../../../helpers/utils/extractKeyWords';
import {formatListMovies} from '../../../../../helpers/utils/formatListMovies';
import {Movie} from '../../../../../models/Movie';
import {DataSugestion} from '../../../../../models/Sugestion';
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

  async getSugestions(
    metaData: DataSugestion,
  ): Promise<{text?: string; movies: Movie[]} | null> {
    if (metaData.text.trim() === '') {
      return null;
    }
    // const responseAssistant = await this.gpt.listenResponse(metaData.text);

    if (true) {
      const data = formatListMovies(list!);
      const words = extractKeyWords(metaData.text);
      console.log('words', words);
      console.log('new request ' + data.text);
      console.log('results', data.result);
      const movies = await this.movies.getAllByName(data.result);

      return {
        text: data.text,
        movies: movies.length > 0 ? movies : [],
      };
    }
    return null;
  }
}
