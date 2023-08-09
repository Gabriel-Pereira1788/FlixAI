import React from 'react';
import {FlatList, ListRenderItemInfo, ViewStyle} from 'react-native';

import {SIZES} from '@constants';
import {Playlist} from '@database';
import {BSON, Results} from 'realm';

import {Box, StackMovies} from '@components';

type Props = {
  allPlaylists: Results<Playlist> | undefined;
  selectLibrary: (id: BSON.ObjectId) => void;
};

export function UserLibraryList({allPlaylists, selectLibrary}: Props) {
  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Playlist>) => {
      return (
        <StackMovies
          title={item.title}
          moviesList={item.movies}
          alignItems="flex-start"
          width={SIZES.width - 50}
          onPress={() => selectLibrary(item._id)}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderSeparator = React.useCallback(() => <Box height={150} />, []);
  if (allPlaylists && allPlaylists.length > 0) {
    return (
      <FlatList
        data={allPlaylists}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={$contentStyle}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    );
  }

  return null;
}

const $contentStyle: ViewStyle = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: SIZES.width,
};
