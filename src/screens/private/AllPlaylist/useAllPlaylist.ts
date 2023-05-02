import React from 'react';
import {useQueryRealm} from '../../../repositories/database/db';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import {useNavigation} from '@react-navigation/native';
import {AllPlaylistViewModel} from './model';
import {Realm} from '@realm/react';
import {usePlaylistStore} from '../../../store/client/usePlaylistStore';

export const useAllPlaylist: AllPlaylistViewModel = () => {
  const navigation = useNavigation();
  const dataPlaylists = useQueryRealm(Playlist);

  const [searchText, setSearchText] = React.useState('');
  const {
    actions: {selectPlaylist},
  } = usePlaylistStore();

  const allPlaylists: Realm.Results<Playlist> = React.useMemo(() => {
    if (searchText.trim() !== '') {
      const newData: Realm.Results<Playlist> = dataPlaylists.filtered(
        `title BEGINSWITH[c] "${searchText}"`,
      );
      return newData;
    }
    return dataPlaylists;
  }, [dataPlaylists, searchText]);

  console.log('searchText', searchText);

  function redirectScreen() {
    navigation.navigate('SelectMovies');
  }

  function handleChangeText(value: string) {
    setSearchText(value);
  }

  function handleSelectPlaylist(id: Realm.BSON.ObjectId) {
    console.log('clicekd');
    selectPlaylist(id);
    navigation.navigate('ListMovies');
  }

  return {
    allPlaylists,
    searchText,
    redirectScreen,
    handleChangeText,
    handleSelectPlaylist,
  };
};
