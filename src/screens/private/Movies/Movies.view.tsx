import React from 'react';
import {ListRenderItem} from 'react-native';

import {SIZES} from '@constants';
import {Movie} from '@models';
import {useNavigation} from '@react-navigation/native';

import {
  SharedLayout,
  RenderIF,
  FilteredMovies,
  AllMovies,
  MovieBox,
} from '@components';

import {MoviesCategories, MoviesHeader} from './components';
import {MoviesViewModel} from './types';

interface MoviesProps {
  viewModel: MoviesViewModel;
}

export default function Movies({viewModel}: MoviesProps) {
  const {categories, filter, dataMovies, isLoading, error, handleFilter} =
    viewModel;

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
      typeLoading="simple"
      error={error}
      HeaderComponent={
        <MoviesHeader filterText={filter.text ?? ''} onFilter={handleFilter} />
      }>
      <MoviesCategories
        categories={categories}
        currentCategory={filter.category}
        onFilter={handleFilter}
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
