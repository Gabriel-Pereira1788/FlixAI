import {IDataMovie, Movie} from '../../../models/Movie';

export interface MoviesImpl {
  findById(id: string): Promise<Movie>;
  getAllByName(name: string[]): Promise<Movie[]>;
  getMoviesList(): Promise<IDataMovie[]>;
}

export interface MovieApiResponse {
  results: Movie[];
}
