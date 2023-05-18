import {ListRenderItem} from 'react-native/types';
import React from 'react';
import * as S from 'native-base';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {IDataMovie, Movie} from '../../models/Movie';

interface AllMoviewsProps {
  dataMovies?: IDataMovie[];
  renderItem: ListRenderItem<Movie>;
}

function AllMovies({dataMovies, renderItem}: AllMoviewsProps) {
  const renderListItem: ListRenderItem<IDataMovie> = React.useCallback(
    ({item, index}) => (
      <S.Box key={index}>
        <Animated.View entering={FadeInDown.delay(150).duration(150)}>
          <S.Text bold color="#ddd" fontSize="xl" my={3}>
            {item.title}
          </S.Text>
        </Animated.View>
        <S.FlatList
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          horizontal
          data={item.list}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 10,
            width: 'auto',
            height: 'auto',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          renderItem={renderItem}
        />
      </S.Box>
    ),
    [renderItem],
  );

  return (
    <S.FlatList
      data={dataMovies}
      initialNumToRender={2}
      maxToRenderPerBatch={3}
      ListFooterComponent={() => <S.Box h={70} />}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      renderItem={renderListItem}
    />
  );
}

export default React.memo(AllMovies);
