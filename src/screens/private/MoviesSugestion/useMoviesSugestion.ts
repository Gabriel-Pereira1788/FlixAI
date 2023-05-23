import React from 'react';
import {DataSugestion} from '../../../models/Sugestion';
import {HookProps} from './models';
import {LibraryDTO} from '../../../models/Library';
import {useNavigation} from '@react-navigation/native';
//*repositories
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';

import {_useSugestions} from '../../../store/server/useSugestions';
import {useUser} from '../../../store/server/useUser';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';

export const useMoviesSugestion = ({
  useSugestions = _useSugestions,
  usePlaylistImpl = usePlaylist,
  useUserImpl = useUser,
}: HookProps) => {
  const navigation = useNavigation();
  const {create} = usePlaylistImpl();
  const {user} = useUserImpl();

  const {focused} = useFocusedScreen();
  const [messageData, setMessageData] = React.useState<DataSugestion>({
    text: '',
    id: '',
  });

  const {data, isLoading, error} = useSugestions({
    messageData,
  });

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
    moviesList: focused ? data?.movies : undefined,
    textGpt: focused ? data?.text : undefined,
    isLoading,
    listenEventSearch,
    createLibrary,
    redirectScreen,
  };
};
