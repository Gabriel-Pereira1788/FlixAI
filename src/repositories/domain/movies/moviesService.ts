import {Movie, IDataMovie} from '@models';

import {MoviesImpl} from './model';
import {MoviesAdapter} from './moviesAdapters';
import {MoviesApi} from './moviesApi';

export class Movies implements MoviesImpl {
  private moviesApi = new MoviesApi();
  private moviesAdapter = new MoviesAdapter();

  async getByGenre(genre?: GenreIdentify) {
    return await this.moviesApi.getByGenre(genre);
  }
  async getAllByName(name: string[]): Promise<Movie[]> {
    const data = await Promise.all(
      name.map(async text => {
        const dataMovie = await this.moviesApi.findByName(text);
        if (dataMovie && dataMovie.results.length > 0) {
          return dataMovie.results[0];
        } else {
          return null;
        }
      }),
    );

    const onlyMoviesData: Movie[] = this.moviesAdapter.toOnlyMovie(data);
    if (onlyMoviesData.length > 0) {
      return onlyMoviesData;
    } else {
      return [];
    }
  }
  async findById(id: string | number): Promise<Movie> {
    const [dataMovie, dataCredits] = await Promise.all([
      this.moviesApi.getById(id),
      this.moviesApi.getCredits(id),
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
        list: await this.moviesApi.getPopular(),
      },
      {
        identify: 'top',
        title: 'Relevantes',
        list: await this.moviesApi.getTopRated(),
      },
      {
        identify: 'action',
        title: 'Ação',
        list: await this.moviesApi.getByGenre('action'),
      },
      {
        identify: 'comedy',
        title: 'Comedia',
        list: await this.moviesApi.getByGenre('comedy'),
      },
      {
        identify: 'horror',
        title: 'Terror',
        list: await this.moviesApi.getByGenre('horror'),
      },
      {
        identify: 'romance',
        title: 'Romance',
        list: await this.moviesApi.getByGenre('romance'),
      },
      {
        identify: 'documentaries',
        title: 'Documentarios',
        list: await this.moviesApi.getByGenre('documentaries'),
      },
      {
        identify: 'adventure',
        title: 'Aventura',
        list: await this.moviesApi.getByGenre('adventure'),
      },
      {
        identify: 'animation',
        title: 'Animação',
        list: await this.moviesApi.getByGenre('animation'),
      },
      {
        identify: 'criminal',
        title: 'Crime',
        list: await this.moviesApi.getByGenre('criminal'),
      },
      {
        identify: 'fantasy',
        title: 'Fantasia',
        list: await this.moviesApi.getByGenre('fantasy'),
      },
    ];
  }
}

export const MoviesService = new Movies();
