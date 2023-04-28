import React from 'react';
import {Movie} from '../../../../../models/Movie';
import * as S from 'native-base';
import CardMovie from '../../../../../components/CardMovie/View';
import {StyleSheet} from 'react-native';
interface MoviesProps {
  movies: Movie[];
}

export default function Movies({movies}: MoviesProps) {
  return (
    <S.FlatList
      data={movies}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({item}) => <CardMovie {...item} />}
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
