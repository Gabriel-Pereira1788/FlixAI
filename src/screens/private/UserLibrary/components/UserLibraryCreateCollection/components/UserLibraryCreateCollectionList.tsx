import React from 'react';
import {FlatList, ListRenderItemInfo, ViewStyle} from 'react-native';

import {Movie} from '@models';
import {useSelectedMoviesActions, useSelectedMoviesStore} from '@store';

import {UserLibraryCreateCollectionCard} from './UserLibraryCreateCollectionCard';

type Props = {
  movies: Movie[];
};

export function UserLibraryCreateCollectionList({movies}: Props) {
  const selectedMovies = useSelectedMoviesStore();

  const {removeToSelected, addToSelected} = useSelectedMoviesActions();

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Movie>) => {
      const isSelected = selectedMovies.find(movie => movie.id === item.id);

      function toggleSelected() {
        isSelected ? removeToSelected(item) : addToSelected(item);
      }
      return (
        <UserLibraryCreateCollectionCard
          isSelected={!!isSelected}
          toggleSelected={toggleSelected}
          {...item}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMovies],
  );
  return (
    <FlatList
      horizontal={false}
      testID="list-movies"
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      data={movies}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={$listContainerStyle}
      renderItem={renderItem}
    />
  );
}

const $listContainerStyle: ViewStyle = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
};
