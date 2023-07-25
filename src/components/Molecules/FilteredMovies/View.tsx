import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {IDataMovie, Movie} from '@models';
import {SIZES} from '@constants';

import {useFilteredMovies as _useFilteredMovies} from './useFilteredMovies';
import {FilteredMoviesViewModel} from './model';
import {Box} from '@components/atoms';

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
