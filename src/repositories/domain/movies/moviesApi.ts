import {api} from '@api';
import {TMDB_GENRES} from '@constants';
import {TMDB_KEY} from '@env';
import {Movie} from '@models';

import {MovieApiResponse} from './model';

export class MoviesApi {
  constructor() {}
  async getPopular(): Promise<Movie[]> {
    const {data} = await api.get<MovieApiResponse>(
      `/movie/popular?api_key=${TMDB_KEY}&language=pt-BR&page=1`,
    );
    return data.results;
  }

  async getTopRated(): Promise<Movie[]> {
    const {data} = await api.get<MovieApiResponse>(
      `/movie/top_rated?api_key=${TMDB_KEY}&language=pt-BR&page=1`,
    );

    return data.results;
  }

  async getByGenre(genreIdentify?: string | number): Promise<Movie[]> {
    const genre = TMDB_GENRES.find(
      dataGenre => dataGenre.identify === genreIdentify,
    );
    const {data} = await api.get<MovieApiResponse>(
      `/discover/movie?api_key=${TMDB_KEY}&language=pt-BR&with_genres=${genre?.id}`,
    );

    return data.results;
  }

  async findByName(name: string): Promise<MovieApiResponse> {
    const {data} = await api.get(
      `/search/movie?api_key=${TMDB_KEY}&language=pt-BR&query=${name}`,
    );

    return data;
  }

  async getById(id: string | number): Promise<Movie> {
    const {data} = await api.get(
      `/movie/${id}?api_key=${TMDB_KEY}&language=pt-BR`,
    );

    return data;
  }

  async getCredits(id: string | number) {
    const {data} = await api.get(
      `/movie/${id}/credits?api_key=${TMDB_KEY}&language=pt-BR`,
    );

    return data;
  }
}
