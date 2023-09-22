import React from 'react';

import {Box, RenderIF, SharedLayout} from '@components';

import {
  SelectMoviesCreateButton,
  SelectMoviesHeader,
  SelectMoviesList,
} from './components';
import {SelectMoviesViewModel} from './types';

interface SelectMoviesProps {
  viewModel: SelectMoviesViewModel;
}
export default function SelectMovies({viewModel}: SelectMoviesProps) {
  const {dataMovies, error, loading, searchText, handleChange} = viewModel;

  return (
    <SharedLayout
      isLoadingData={loading}
      error={error}
      HeaderComponent={
        <SelectMoviesHeader
          onChangeText={handleChange}
          searchText={searchText}
        />
      }>
      <Box
        flex={1}
        backgroundColor="background"
        alignItems="center"
        justifyContent="center">
        <RenderIF condition={!loading && !!dataMovies}>
          <Box flex={1}>
            <SelectMoviesList dataMovies={dataMovies} searchText={searchText} />

            <SelectMoviesCreateButton />
          </Box>
        </RenderIF>
      </Box>
    </SharedLayout>
  );
}
