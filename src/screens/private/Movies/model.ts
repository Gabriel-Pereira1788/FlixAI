import {Genre, IDataMovie} from '../../../models/Movie';

export type MoviesViewModel = () => {
  dataMovies?: IDataMovie[];
  isLoading: boolean;
  categories: Genre[];
  filter: Filter;
  handleFilter(filter: Filter): void;
};
