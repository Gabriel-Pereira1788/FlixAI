import {IDataMovie, Movie} from '../../../../../models/Movie';

export interface MoviesImpl {
  get(): Promise<void>;
  getByGenre(genre: GenreIdentify): Promise<Movie[]>;
  getByName(name: string): Promise<any>;
  findById(id: string): Promise<any>;
  getAllByName(name: string[]): Promise<any>;
  getMoviesList(): Promise<IDataMovie[]>;
}
