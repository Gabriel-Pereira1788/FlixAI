import {ListMoviesViewModel} from './model';
import {useObject} from '../../../repositories/database/db';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import React from 'react';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';

export const useListMovies: ListMoviesViewModel = ({idList}) => {
  const playlistData = useObject(Playlist, idList);
  const {focused} = useFocusedScreen();

  const displayMovies = React.useMemo(() => {
    return playlistData && focused ? playlistData.movies : [];
  }, [playlistData, focused]);

  return {
    title: playlistData ? playlistData.title : '',
    dataMovies: displayMovies,
  };
};
