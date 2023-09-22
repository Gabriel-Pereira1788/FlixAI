import React from 'react';
import {FlatList, ListRenderItemInfo, ViewStyle} from 'react-native';

import {Movie} from '@models';
import {useNavigation} from '@react-navigation/native';

import {CardMovie} from '@components';

type Props = {
  list: Movie[] | undefined;
};

export function MoviesSuggestionsList({list}: Props) {
  const navigation = useNavigation();

  const renderItem = React.useCallback(
    ({item, index}: ListRenderItemInfo<Movie>) => (
      <CardMovie
        testID="card-movie"
        index={index}
        {...item}
        stackStyle={{marginVertical: 'xs'}}
        onPress={() => navigation.navigate('SingleMovie', {idMovie: item.id})}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (list && list.length > 0) {
    return (
      <FlatList
        scrollEventThrottle={16}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        showsVerticalScrollIndicator={false}
        data={list!}
        contentContainerStyle={$listContentStyle}
        renderItem={renderItem}
      />
    );
  }

  return null;
}

const $listContentStyle: ViewStyle = {
  width: '100%',
  flexGrow: 1,
  marginBottom: '30%',
  paddingBottom: 50,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 2,
};
