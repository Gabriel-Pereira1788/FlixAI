import React from 'react';
import {useQueryRealm} from '../../../repositories/database/db';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import {useNavigation} from '@react-navigation/native';
import {AllPlaylistViewModel} from './model';

export const useAllPlaylist: AllPlaylistViewModel = () => {
  const navigation = useNavigation();
  const dataPlaylists = useQueryRealm(Playlist);

  const allPlaylists: Realm.Results<Playlist> = React.useMemo(() => {
    return dataPlaylists;
  }, [dataPlaylists]);

  function redirectScreen() {
    navigation.navigate('SelectMovies');
  }

  return {
    allPlaylists,
    redirectScreen,
  };
};
