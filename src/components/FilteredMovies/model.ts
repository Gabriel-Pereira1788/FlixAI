import {Movie} from '../../models/Movie';
import {FilteredMoviesProps} from './View';

type HookProps = Pick<FilteredMoviesProps, 'filter' | 'movies'>;

export type FilteredMoviesViewModel = (props: HookProps) => {
  displayMovies: Movie[];
};
