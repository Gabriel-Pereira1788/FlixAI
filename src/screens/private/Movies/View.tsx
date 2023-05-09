import React from 'react';
import {ListRenderItem, StyleSheet, TouchableOpacity} from 'react-native';
import * as S from 'native-base';
import {MoviesViewModel} from './model';
import {_useMovies} from './useMovies';

import BottomTab from '../../../components/BottomTab/View';
import SharedLayout from '../../../components/SharedLayout/View';
import SearchBar from '../../../components/SearchBar/View';
import Header from './components/Header/View';
import Category from '../../../components/Category/View';
import RenderIF from '../../../components/RenderIF/View';
import FilteredMovies from '../../../components/FilteredMovies/View';
import AllMovies from '../../../components/AllMovies/View';
import {Movie} from '../../../models/Movie';
import MovieBox from '../../../components/MovieBox/View';
import {SIZES} from '../../../helpers/constants/sizes';
import {useNavigation} from '@react-navigation/native';
interface MoviesProps {
  useMovies?: MoviesViewModel;
}

export default function Movies({useMovies = _useMovies}: MoviesProps) {
  const {categories, filter, dataMovies, isLoading, handleFilter} = useMovies();

  const navigation = useNavigation();

  const renderFilteredItem: ListRenderItem<Movie> = React.useCallback(
    ({item}) => (
      <MovieBox
        testID="filtered-movie-item"
        w={SIZES.width - 50}
        h={SIZES.height / 2 - 20}
        key={item.id}
        dataMovie={item}
        onPress={() =>
          navigation.navigate('SingleMovie', {
            idMovie: item.id,
          })
        }
      />
    ),
    [navigation],
  );
  const renderMoviesItem: ListRenderItem<Movie> = React.useCallback(
    ({item}) => (
      <MovieBox
        testID="movie-item"
        key={item.id}
        dataMovie={item}
        onPress={() =>
          navigation.navigate('SingleMovie', {
            idMovie: item.id,
          })
        }
      />
    ),
    [navigation],
  );
  return (
    <SharedLayout
      isLoadingData={isLoading}
      BottomComponent={<BottomTab currentPath="movies" />}
      HeaderComponent={
        <S.Box px={10} my={2}>
          <Header username="gabriel" />
          <SearchBar
            testID="input-search"
            placeholder="Pesquise aqui"
            placeholderTextColor="#ddd"
            value={filter.text}
            onChangeText={value =>
              handleFilter({
                text: value,
              })
            }
          />
        </S.Box>
      }>
      <S.FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentStyle}
        renderItem={({item, index}) => (
          <TouchableOpacity
            testID="category-element"
            onPress={() =>
              handleFilter({
                category: item.identify,
              })
            }>
            <Category
              key={index}
              text={item.name}
              identify={item.identify}
              currentCategory={filter.category}
            />
          </TouchableOpacity>
        )}
      />
      <RenderIF
        condition={filter.category === 'all' && filter.text === ''}
        AlternativeComponent={
          <FilteredMovies
            filter={filter}
            movies={dataMovies}
            renderItem={renderFilteredItem}
          />
        }>
        <AllMovies dataMovies={dataMovies} renderItem={renderMoviesItem} />
      </RenderIF>
    </SharedLayout>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    marginVertical: 10,
    width: 'auto',
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
