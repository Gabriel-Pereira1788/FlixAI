import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import {SIZES} from '@constants';
import {IDataMovie, Movie} from '@models';

import {Box} from '@components';

import {FilteredMoviesViewModel} from './model';
import {useFilteredMovies as _useFilteredMovies} from './useFilteredMovies';

export interface FilteredMoviesProps {
  movies?: IDataMovie[];
  filter: Filter;
  renderItem: ListRenderItem<Movie>;
  useFilteredMovies?: FilteredMoviesViewModel;
}

export function FilteredMovies({
  movies,
  filter,
  renderItem,
  useFilteredMovies = _useFilteredMovies,
}: FilteredMoviesProps) {
  const {displayMovies} = useFilteredMovies({movies, filter});
  return (
    <FlatList
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      data={displayMovies}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<Box height={70} />}
      numColumns={1}
      contentContainerStyle={{
        flexGrow: 1,
        width: SIZES.width,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      renderItem={renderItem}
    />
  );
}
