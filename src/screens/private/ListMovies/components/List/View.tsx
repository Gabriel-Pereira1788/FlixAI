import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import CardMovie from '../../../../../components/CardMovie/View';
import {SIZES} from '../../../../../helpers/constants/sizes';
import {ListRenderItem, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ListProps {
  moviesList: Movie[];
}

export default function List({moviesList}: ListProps) {
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
    <S.FlatList
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
