import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import {IDataMovie, Movie} from '@models';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Box, Text} from '@components';

interface AllMoviewsProps {
  dataMovies?: IDataMovie[];
  renderItem: ListRenderItem<Movie>;
}

export const AllMovies = React.memo(
  ({dataMovies, renderItem}: AllMoviewsProps) => {
    const renderListItem: ListRenderItem<IDataMovie> = React.useCallback(
      ({item, index}) => (
        <Box key={index}>
          <Animated.View entering={FadeInDown.delay(150).duration(150)}>
            <Text
              variant="movieTitle"
              fontWeight="600"
              color="gray"
              fontSize={18.5}
              marginVertical={'s'}>
              {item.title}
            </Text>
          </Animated.View>
          <FlatList
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
        </Box>
      ),
      [renderItem],
    );

    return (
      <FlatList
        data={dataMovies}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        ListFooterComponent={() => <Box height={70} />}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        renderItem={renderListItem}
      />
    );
  },
);
