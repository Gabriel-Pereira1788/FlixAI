import React from 'react';
import {DataSugestion} from '../../../models/Sugestion';
import {HookProps} from './models';
import {PlaylistDTO} from '../../../models/Playlist';
import {useNavigation} from '@react-navigation/native';
//*repositories
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';

import {_useSugestions} from '../../../store/server/useSugestions';

export const usePlaylistSugestion = ({
  useSugestions = _useSugestions,
  usePlaylistImpl = usePlaylist,
}: HookProps) => {
  const navigation = useNavigation();
  const {create} = usePlaylistImpl();

  const [messageData, setMessageData] = React.useState<DataSugestion>({
    text: '',
    id: '',
  });

  const {data, isLoading} = useSugestions({
    messageData,
  });

  async function onCreate(dataPlaylist: PlaylistDTO) {
    await create(dataPlaylist);
  }
  async function onSearch(value: string) {
    const messageSend: DataSugestion = {
      text: value,
      id: Math.random()
        .toString(36)
        .substring(2, value.length + 2),
    };
    setMessageData(messageSend);
  }

  function redirectScreen(id: number) {
    return () => {
      navigation.navigate('SingleMovie', {idMovie: id});
    };
  }

  return {
    messageData,
    data: data?.movies,
    textGpt: data?.text,
    isLoading,
    onSearch,
    onCreate,
    redirectScreen,
  };
};
