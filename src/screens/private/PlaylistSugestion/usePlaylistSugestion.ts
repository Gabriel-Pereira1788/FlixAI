import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {AssistantSugestion} from '../../../repositories/services/api/modules/assistantSugestion/assistantSugestion';
import {DataSugestion} from '../../../models/Sugestion';
import {PlaylistSugestionViewModel} from './models';
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';
import {PlaylistDTO} from '../../../models/Playlist';
import {useNavigation} from '@react-navigation/native';

const Assistant = new AssistantSugestion();

export const usePlaylistSugestion: PlaylistSugestionViewModel = () => {
  const navigation = useNavigation();
  const [messageData, setMessageData] = React.useState<DataSugestion>({
    text: '',
    id: '',
  });

  const {data, isLoading} = useQuery(
    ['sugestions', messageData.text.trim()],
    () => Assistant.getSugestions(messageData),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const {create} = usePlaylist();

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
    data: data?.movies,
    textGpt: data?.text,
    isLoading,
    onSearch,
    onCreate,
    redirectScreen,
  };
};
