import React from 'react';
import {Playlist} from '../../../repositories/database/schemas/PlaylistSchema';
import {useNavigation} from '@react-navigation/native';
import {HookProps} from './model';
import {Realm} from '@realm/react';
import {usePlaylistStore as _usePlaylistStore} from '../../../store/client/PlaylistStore/usePlaylistStore';
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';

export const useAllPlaylist = ({
  usePlaylistStore = _usePlaylistStore,
  useCasePlaylist = usePlaylist,
}: HookProps) => {
  const navigation = useNavigation();
  const dataPlaylists = useCasePlaylist();
  const {selectPlaylist} = usePlaylistStore();

  const [searchText, setSearchText] = React.useState('');

  const allPlaylists: Realm.Results<Playlist> = React.useMemo(() => {
    if (searchText.trim() !== '') {
      const newData = dataPlaylists.filtered(
        `title BEGINSWITH[c] "${searchText}"`,
      );
      return newData;
    }
    return dataPlaylists.get();
  }, [dataPlaylists, searchText]);

  console.log('searchText', searchText);

  function redirectScreen() {
    navigation.navigate('SelectMovies');
  }

  function handleChangeText(value: string) {
    setSearchText(value);
  }

  function handleSelectPlaylist(id: Realm.BSON.ObjectId) {
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
