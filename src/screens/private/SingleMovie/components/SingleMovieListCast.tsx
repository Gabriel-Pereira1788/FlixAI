import React from 'react';
import {ListRenderItemInfo, ViewStyle} from 'react-native';

import {Cast} from '@models';
import {FlatList} from 'react-native-gesture-handler';

import {SingleMovieCardCast} from './SingleMovieCardCast';

interface ListCastProps {
  cast?: Cast[];
}

export function SingleMovieListCast({cast}: ListCastProps) {
  const displayCast =
    cast && cast.length > 0 ? cast.filter(data => !!data.profile_path) : [];

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Cast>) => <SingleMovieCardCast {...item} />,
    [],
  );

  return (
    <>
      {displayCast.length > 0 && (
        <FlatList
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          horizontal={true}
          data={displayCast}
          contentContainerStyle={$containerStyle}
          renderItem={renderItem}
        />
      )}
    </>
  );
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  height: 'auto',
  width: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
  padding: 20,
};
