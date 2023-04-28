import {Movie} from '../../../../../models/Movie';

export type CreatePlaylistViewModel = () => {
  popularMovies: Movie[] | undefined;
  loading: boolean;
};
