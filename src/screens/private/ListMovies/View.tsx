import React from 'react';
import {SafeAreaView} from 'react-native';

import {SharedLayout, RenderIF} from '@components';
import {usePlaylistStore} from '@store';

import {ListMoviesViewModel} from './model';
import {useListMovies as _useListMovies} from './useListMovies';
import List from './components/List/View';
import {NavigationProps} from '../../../router/navigation';
import {ListMoviesHeader} from './components/ListMoviesHeader/View';

interface ListMoviesProps extends NavigationProps<'ListMovies'> {
  useListMovies?: ListMoviesViewModel;
}

export default function ListMovies({
  useListMovies = _useListMovies,
}: ListMoviesProps) {
  const {
    state: {idPlaylist},
  } = usePlaylistStore();

  const {moviesList, title, library, handleOnSearch} = useListMovies({
    idPlaylist,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0f0f16'}}>
      <SharedLayout
        HeaderComponent={
          <ListMoviesHeader
            handleOnSearch={handleOnSearch}
            library={library}
            title={title}
          />
        }>
        <RenderIF condition={!!moviesList && moviesList.length > 0}>
          <List moviesList={moviesList!} />
        </RenderIF>
      </SharedLayout>
    </SafeAreaView>
  );
}
