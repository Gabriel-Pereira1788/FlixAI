import {TMDB_GENRES} from '../../../../../helpers/constants/tmdb';
import {TMDB_KEY} from '@env';
import {Movie, IDataMovie} from '../../../../../models/Movie';
import {api} from '../../api';
import {MoviesImpl} from './model';

export class Movies implements MoviesImpl {
  async get(): Promise<any> {
    return {};
  }

  async getByGenre(genre: GenreIdentify): Promise<Movie[]> {
    if (genre === 'popular') {
      const {data} = await api.get(
        `/movie/popular?api_key=${TMDB_KEY}&language=pt-BR&page=1`,
      );

      return data.results;
    }

    if (genre === 'top') {
      const {data} = await api.get(
        `/movie/top_rated?language=pt-BR&api_key=${TMDB_KEY}`,
      );

      return data.results;
    }

    const findedGenre = TMDB_GENRES.find(
      dataGenre => dataGenre.identify === genre,
    );

    const {data} = await api.get(
      `/discover/movie?api_key=${TMDB_KEY}&language=pt-BR&with_genres=${findedGenre?.id}`,
    );

    return data.results;
  }
  async getByName(name: string): Promise<any> {
    const {data} = await api.get(
      `/search/movie?api_key=${TMDB_KEY}&language=pt-BR&query=${name}`,
    );
    if (data && data.results.length > 0) {
      return data.results[0];
    } else {
      return null;
    }
  }

  async getAllByName(name: string[]): Promise<Movie[]> {
    const data = await Promise.all(
      name.map(async text => await this.getByName(text)),
    );

    if (data.length > 0) {
      return data.filter(movie => !!movie);
    } else {
      return [];
    }
  }
  async findById(id: string | number): Promise<Movie> {
    const dataMOvieUrl = `/movie/${id}?api_key=${TMDB_KEY}&language=pt-BR`;
    const dataCreditsUrl = `/movie/${id}/credits?api_key=${TMDB_KEY}&language=pt-BR`;

    const [{data: dataMovie}, {data: dataCredits}] = await Promise.all([
      api.get(dataMOvieUrl),
      api.get(dataCreditsUrl),
    ]);
    return {
      ...dataMovie,
      cast: dataCredits.cast,
    };
  }

  async getMoviesList(): Promise<IDataMovie[]> {
    return [
      {
        identify: 'popular',
        title: 'Em alta',
        list: await this.getByGenre('popular'),
      },
      {
        identify: 'top',
        title: 'Relevantes',
        list: await this.getByGenre('top'),
      },
      {
        identify: 'action',
        title: 'Ação',
        list: await this.getByGenre('action'),
      },
      {
        identify: 'comedy',
        title: 'Comedia',
        list: await this.getByGenre('comedy'),
      },
      {
        identify: 'horror',
        title: 'Terror',
        list: await this.getByGenre('horror'),
      },
      {
        identify: 'romance',
        title: 'Romance',
        list: await this.getByGenre('romance'),
      },
      {
        identify: 'documentaries',
        title: 'Documentarios',
        list: await this.getByGenre('documentaries'),
      },
    ];
  }
}

export const MoviesApi = new Movies();
