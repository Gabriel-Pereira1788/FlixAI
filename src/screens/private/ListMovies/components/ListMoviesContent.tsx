import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';

import {SIZES} from '@constants';
import {Movie} from '@models';
import {useNavigation} from '@react-navigation/native';

import {CardMovie} from '@components';

interface ListProps {
  moviesList: Movie[];
}

export function ListMoviesContent({moviesList}: ListProps) {
  const navigation = useNavigation();

  const renderItem: ListRenderItem<Movie> = React.useCallback(
    ({item}) => (
      <CardMovie
        testID="cardMovie"
        key={item.id}
        {...item}
        backdrop_path={item.backdrop_path}
        vote_count={item.vote_count}
        vote_average={item.vote_average}
        title={item.title}
        overview={item.overview}
        onPress={() => navigation.navigate('SingleMovie', {idMovie: item.id})}
      />
    ),
    [navigation],
  );
  return (
    <FlatList
      data={moviesList}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: SIZES.width,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
