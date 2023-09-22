import React from 'react';
import {ListRenderItem} from 'react-native';

import {SIZES} from '@constants';
import {IDataMovie, Movie} from '@models';
import {useSelectedMoviesActions} from '@store';

import {AllMovies, FilteredMovies} from '@components';

import {SelectCardMovie} from './SelectCardMovie';

// import {SelectedCardMovie} from './SelectedCardMovie/View';

type Props = {
  searchText: string;
  dataMovies: IDataMovie[] | undefined;
};

export function SelectMoviesList({searchText, dataMovies}: Props) {
  const {addToSelected, removeToSelected} = useSelectedMoviesActions();

  function toggleIsSelectedStore(data: Movie, isSelected: boolean) {
    isSelected ? removeToSelected(data) : addToSelected(data);
  }
  const renderItem: ListRenderItem<Movie> = React.useCallback(
    ({item, index}) => {
      return (
        <SelectCardMovie
          testID="filter-selected-movie"
          w={SIZES.width - 50}
          h={SIZES.height / 2 - 20}
          key={index}
          dataMovie={item}
          toggleIsSelectedStore={toggleIsSelectedStore}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderMoviesItem: ListRenderItem<Movie> = React.useCallback(
    ({item, index}) => {
      return (
        <SelectCardMovie
          key={index}
          dataMovie={item}
          toggleIsSelectedStore={toggleIsSelectedStore}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (searchText.trim() === '') {
    return <AllMovies dataMovies={dataMovies} renderItem={renderMoviesItem} />;
  }
  return (
    <FilteredMovies
      movies={dataMovies!}
      filter={{
        text: searchText,
        category: 'all',
      }}
      renderItem={renderItem}
    />
  );
}
