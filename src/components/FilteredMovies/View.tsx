import React from 'react';
import * as S from 'native-base';
import {ListRenderItem} from 'react-native';
import {IDataMovie, Movie} from '../../models/Movie';
import {useFilteredMovies} from './useFilteredMovies';
import {SIZES} from '../../helpers/constants/sizes';

export interface FilteredMoviesProps {
  movies?: IDataMovie[];
  filter: Filter;
  renderItem: ListRenderItem<Movie>;
}

function FilteredMovies({movies, filter, renderItem}: FilteredMoviesProps) {
  const {displayMovies} = useFilteredMovies({movies, filter});
  return (
    <S.FlatList
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      data={displayMovies}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<S.Box h={70} />}
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

export default React.memo(FilteredMovies);
