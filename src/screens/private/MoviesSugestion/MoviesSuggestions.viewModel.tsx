import React from 'react';

import {QUERY_KEYS} from '@constants';
import {useAssistantSuggestion} from '@domain';
import {DataSugestion} from '@models';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

export const useMoviesSuggestionViewModel = () => {
  const {fetchMoviesSuggestions} = useAssistantSuggestion({});
  const navigation = useNavigation();

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
    messageData,
    error,
    moviesList: data?.movies,
    message: data?.text,
    isLoading,
    listenEventSearch,
    redirectScreen,
  };
};
