import React from 'react';

import {useGetSuggestions} from '@domain';
import {DataSugestion} from '@models';
import {useNavigation} from '@react-navigation/native';

export const useMoviesSuggestionViewModel = () => {
  const navigation = useNavigation();

  const [messageData, setMessageData] = React.useState<DataSugestion>({
    text: '',
    id: '',
  });

  const {data, isLoading, error} = useGetSuggestions({
    searchText: messageData.text,
  });

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
