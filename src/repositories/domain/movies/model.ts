import {IDataMovie, Movie} from '../../../models/Movie';

export interface MoviesImpl {
  findById(id: string): Promise<any>;
  getAllByName(name: string[]): Promise<any>;
  getMoviesList(): Promise<IDataMovie[]>;
}

export interface MovieApiResponse {
  results: Movie[];
}
