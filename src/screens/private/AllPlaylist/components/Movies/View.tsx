import React from 'react';
import {Movie} from '../../../../../models/Movie';
import * as S from 'native-base';
import {StyleSheet} from 'react-native';
import SelectMovieCard from '../SelectMovieCard/View';
interface MoviesProps {
  movies: Movie[];
}

export default function Movies({movies}: MoviesProps) {
  return (
    <S.FlatList
      data={movies}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({item}) => <SelectMovieCard {...item} />}
    />
  );
}

export const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
