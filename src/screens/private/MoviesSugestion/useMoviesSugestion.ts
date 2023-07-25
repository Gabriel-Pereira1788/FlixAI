import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import {LibraryDTO, DataSugestion} from '@models';
import {QUERY_KEYS} from '@constants';
import {usePlaylist} from '@database';
import {useAssistantSuggestion} from '@domain';

import {useUser} from '../../../store/server/useUser';
import {HookProps} from './models';

export const useMoviesSugestion = ({
  usePlaylistImpl = usePlaylist,
  useUserImpl = useUser,
  useAssistantSuggestionImpl = useAssistantSuggestion,
}: HookProps) => {
  const navigation = useNavigation();
  const {create} = usePlaylistImpl();
  const {user} = useUserImpl();
  const {fetchMoviesSuggestions} = useAssistantSuggestionImpl({});

  const [messageData, setMessageData] = React.useState<DataSugestion>({
    text: '',
    id: '',
  });

  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.suggestions, messageData.text.trim()],
    () => fetchMoviesSuggestions(messageData.text),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  async function createLibrary(library: LibraryDTO) {
    await create(library);
  }

  async function listenEventSearch(value: string) {
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
    username: user?.name ?? '',
    messageData,
    error,
    moviesList: data?.movies,
    textGpt: data?.text,
    isLoading,
    listenEventSearch,
    createLibrary,
    redirectScreen,
  };
};
