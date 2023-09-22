import React from 'react';
import {SafeAreaView} from 'react-native';

import {SharedLayout, RenderIF} from '@components';

import {ListMoviesContent} from './components/ListMoviesContent';
import {ListMoviesHeader} from './components/ListMoviesHeader';
import {ListMoviesViewModel} from './types';

interface ListMoviesProps {
  viewModel: ListMoviesViewModel;
  title: string;
}

export default function ListMovies({viewModel, title}: ListMoviesProps) {
  const {moviesList, handleOnSearch, openModalConfirmation} = viewModel;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0f0f16'}}>
      <SharedLayout
        HeaderComponent={
          <ListMoviesHeader
            handleOnSearch={handleOnSearch}
            openModal={openModalConfirmation}
            title={title}
          />
        }>
        <RenderIF condition={!!moviesList && moviesList.length > 0}>
          <ListMoviesContent moviesList={moviesList!} />
        </RenderIF>
      </SharedLayout>
    </SafeAreaView>
  );
}
