import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {Genre} from '@models';

import {Category} from '@components';

type Props = {
  categories: Genre[];
  currentCategory: GenreIdentify | undefined;
  onFilter: (filterData: Filter) => void;
};

export function MoviesCategories({
  categories,
  currentCategory,
  onFilter,
}: Props) {
  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<Genre>) => {
      return (
        <TouchableOpacity
          testID="category-element"
          onPress={() =>
            onFilter({
              category: item.identify,
            })
          }>
          <Category
            key={index}
            text={item.name}
            identify={item.identify}
            currentCategory={currentCategory}
          />
        </TouchableOpacity>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCategory],
  );
  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      scrollToOverflowEnabled={false}
      contentContainerStyle={$contentStyle}
      renderItem={renderItem}
    />
  );
}

const $contentStyle: ViewStyle = {
  marginVertical: 10,
  width: 'auto',
  height: 100,
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingHorizontal: 10,
};
