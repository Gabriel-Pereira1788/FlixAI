import React from 'react';

import {Playlist} from '@database';
import {useNavigation} from '@react-navigation/native';
import {Realm} from '@realm/react';
import {Results} from 'realm';

import {HookProps} from './types';

export const useUserLibrary = ({selectPlaylist, dataPlaylists}: HookProps) => {
  const navigation = useNavigation();

  const [allPlaylists, setAllPlaylists] = React.useState<Results<Playlist>>();

  function fetchPlaylists(text?: string) {
    if (text && text.trim() !== '') {
      const newData = dataPlaylists.filtered(`title BEGINSWITH[c] "${text}"`);
      setAllPlaylists(newData);
      return;
    }
    const playlists = dataPlaylists.get();
    setAllPlaylists(playlists);
  }

  function handleSelectLibrary(id: Realm.BSON.ObjectId) {
    selectPlaylist(id);
    navigation.navigate('ListMovies');
  }

  React.useEffect(() => {
    fetchPlaylists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    allPlaylists,
    fetchPlaylists,
    handleSelectLibrary,
  };
};
