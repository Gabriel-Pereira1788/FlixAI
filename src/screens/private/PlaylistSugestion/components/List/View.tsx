import React from 'react';
import * as S from 'native-base';
import CardMovie from '../../../../../components/CardMovie/View';
import {Movie} from '../../../../../models/Movie';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: Movie[];
};

function List({data}: Props) {
  const navigation = useNavigation();
  return (
    <S.FlatList
      scrollEventThrottle={16}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      showsVerticalScrollIndicator={false}
      data={data!}
      contentContainerStyle={styles.list}
      renderItem={({item, index}) => (
        <CardMovie
          index={index}
          {...item}
          stackStyle={{marginY: '5%'}}
          onPress={() => navigation.navigate('SingleMovie', {idMovie: item.id})}
        />
      )}
    />
  );
}

export default React.memo(List);

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flexGrow: 1,
    marginBottom: '30%',
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
