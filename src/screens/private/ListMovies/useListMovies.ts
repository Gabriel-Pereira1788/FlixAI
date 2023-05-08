import {HookProps} from './model';
import {useObject} from '../../../repositories/database/db';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import React from 'react';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';

export const useListMovies = ({idPlaylist}: HookProps) => {
  const playlistData = useObject(Playlist, idPlaylist!);
  const {focused} = useFocusedScreen();

  const displayMovies = React.useMemo(() => {
    return playlistData && focused ? playlistData.movies : [];
  }, [playlistData, focused]);

  function handleOnSearch(value: string) {
    console.log(value);
  }

  return {
    title: playlistData ? playlistData.title : '',
    dataMovies: displayMovies,
    handleOnSearch,
  };
};
