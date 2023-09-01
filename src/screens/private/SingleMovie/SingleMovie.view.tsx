import React from 'react';
import {ViewStyle} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';

import {Box, Loading, RenderIF} from '@components';

import {
  SingleMovieInformation,
  SingleMovieListCast,
  SingleMoviePoster,
  SingleMovieWrapperContent,
} from './components';
import {SingleMovieCollectionHandler} from './components/SingleMovieCollectionHandler';
import {SingleMovieViewModel} from './types';

interface SingleMovieProps {
  viewModel: SingleMovieViewModel;
}
export default function SingleMovie({viewModel}: SingleMovieProps) {
  const {
    dataMovie,
    currentMovieCollection,
    collectionsAvailable,
    focused,
    loading,
    refreshCollection,
  } = viewModel;

  return (
    <Box flex={1} justifyContent="center" backgroundColor="background">
      <RenderIF
        condition={!loading && focused}
        AlternativeComponent={
          <Box
            testID="loading"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <Loading typeLoading="simple" />
          </Box>
        }>
        {dataMovie && dataMovie.poster_path && (
          <SingleMoviePoster imagePath={`${dataMovie.poster_path}`} />
        )}
        <SingleMovieWrapperContent>
          <ScrollView contentContainerStyle={$scrollContainerStyle}>
            <SingleMovieInformation movie={dataMovie!} />
            <SingleMovieCollectionHandler
              collectionsAvailable={collectionsAvailable}
              currentMovieCollection={currentMovieCollection}
              movie={dataMovie!}
              refreshCollection={refreshCollection}
            />
            <SingleMovieListCast cast={dataMovie?.cast} />
          </ScrollView>
        </SingleMovieWrapperContent>
      </RenderIF>
    </Box>
  );
}

const $scrollContainerStyle: ViewStyle = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: '#0f0f16',
};
