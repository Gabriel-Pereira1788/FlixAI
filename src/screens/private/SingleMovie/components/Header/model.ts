import {Movie} from '../../../../../models/Movie';
import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';
import {useHeader} from './useHeader';

export type FindMovie = Pick<ReturnType<PlaylistImpl>, 'findMovieInPlaylist'>;

export interface HookProps {
  movie?: Movie;
  playlistImpl: FindMovie;
}

export type HeaderViewModel = (
  props: HookProps,
) => ReturnType<typeof useHeader>;
