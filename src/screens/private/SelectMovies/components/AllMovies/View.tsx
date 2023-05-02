import {ListRenderItem} from 'react-native/types';
import {IDataMovie, Movie} from '../../../../../models/Movie';
import React from 'react';
import SelectedCardMovie from '../SelectedCardMovie/View';
import * as S from 'native-base';
import Animated, {FadeInDown} from 'react-native-reanimated';

interface AllMoviewsProps {
  dataMovies?: IDataMovie[];
}

function AllMovies({dataMovies}: AllMoviewsProps) {
  const renderItem: ListRenderItem<Movie> = React.useCallback(
    ({item, index}) => {
      return <SelectedCardMovie key={index} dataMovie={item} />;
    },
    [],
  );

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
          horizontal
          data={item.list}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 10,
            width: 'auto',
            height: 'auto',
            alignItems: 'center',
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
