import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import CardMovie from '../../../../../components/CardMovie/View';
import {SIZES} from '../../../../../helpers/constants/sizes';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ListProps {
  dataMovies: Movie[];
}

export default function List({dataMovies}: ListProps) {
  const navigation = useNavigation();

  function redirectPage(id: number) {
    return () => {
      navigation.navigate('SingleMovie', {idMovie: id});
    };
  }
  return (
    <S.FlatList
      data={dataMovies}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <CardMovie
          testID="cardMovie"
          key={item.id}
          {...item}
          backdrop_path={item.backdrop_path}
          vote_count={item.vote_count}
          vote_average={item.vote_average}
          title={item.title}
          overview={item.overview}
          onPress={redirectPage(item.id)}
        />
      )}
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
