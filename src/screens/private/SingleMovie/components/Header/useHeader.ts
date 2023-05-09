import React from 'react';

import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';

import {HookProps} from './model';

export const useHeader = ({
  movie,
  playlistImpl: {findMovieInPlaylist},
}: HookProps) => {
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
