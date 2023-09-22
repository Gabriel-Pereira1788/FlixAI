import React, {useEffect, useState} from 'react';

import {DataMovieCollection, PlaylistResults, useCollection} from '@database';
import {useGetSingleMovie} from '@domain';
import {useIsFocused} from '@react-navigation/native';

export const useSingleMovieViewModel = (id: number | string) => {
  const focused = useIsFocused();
  const {data, isLoading, error} = useGetSingleMovie(id);
  const playlistQuery = useCollection();

  const [currentMovieCollection, setMovieCollection] =
    useState<DataMovieCollection | null>(null);

  const collectionsAvailable: PlaylistResults = React.useMemo(() => {
    return playlistQuery.get();
  }, [playlistQuery]);

  function refreshCollection() {
    if (data) {
      const newMovieCollection = playlistQuery.findMovieInPlaylist(data.id);
      setMovieCollection(newMovieCollection);
    }
  }

  useEffect(() => {
    refreshCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    currentMovieCollection,
    collectionsAvailable,
    refreshCollection,
    focused,
    dataMovie: focused ? data : undefined,
    error: !!error,
    loading: isLoading,
  };
};
