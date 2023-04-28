import {Cast} from './Cast';

export interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  name: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: any[];
  cast?: Cast[];
  homepage?: string;
  imdb_id: string;
}
export interface Genre {
  id?: number;
  name: string;
  identify?: GenreIdentify;
}

export interface IDataMovie {
  identify: GenreIdentify;
  title: string;
  list: Movie[];
}
