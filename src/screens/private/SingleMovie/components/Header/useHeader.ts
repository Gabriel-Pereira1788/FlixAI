import React from 'react';
import {Movie} from '../../../../../models/Movie';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';
import {PlaylistImpl} from '../../../../../repositories/database/useCases/Playlist/model';
import {usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';

interface HookProps {
  movie?: Movie;
  usePlaylistImpl?: PlaylistImpl;
}

export const useHeader = ({
  movie,
  usePlaylistImpl = usePlaylist,
}: HookProps) => {
  const {findMovieInPlaylist} = usePlaylistImpl();
  const [haveInPlaylist, setHaveInPlaylist] = React.useState(false);
  const [playlist, setPlaylist] = React.useState<Playlist[]>([]);

  React.useEffect(() => {
    if (movie && movie.id) {
      const findedMovie = findMovieInPlaylist(movie.id);

      setHaveInPlaylist(!!findedMovie.dataMovie);
      setPlaylist(findedMovie.dataPlaylist);
    }
  }, [findMovieInPlaylist, movie]);

  return {
    haveInPlaylist,
    playlist,
  };
};

export type HeaderViewModel = (
  props: HookProps,
) => ReturnType<typeof useHeader>;
