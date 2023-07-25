import {Movie} from '../../../models/Movie';
import {MoviesByGenreImpl} from '../../../store/server/useMoviesByGenre';
import {FilteredMoviesProps} from './View';

type HookProps = Pick<FilteredMoviesProps, 'filter' | 'movies'> & {
  useMoviesByGenreImpl?: MoviesByGenreImpl;
};

export type FilteredMoviesViewModel = (props: HookProps) => {
  displayMovies: Movie[];
};
