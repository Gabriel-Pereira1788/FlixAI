import React from 'react';
import * as S from 'native-base';
import SharedLayout from '../../../components/SharedLayout/View';
import {ListMoviesViewModel} from './model';
import {useListMovies as _useListMovies} from './useListMovies';
import SearchHeader from '../../../components/SearchHeader/View';
import List from './components/List/View';
import RenderIF from '../../../components/RenderIF/View';
import {usePlaylistStore} from '../../../store/client/PlaylistStore/usePlaylistStore';

interface ListMoviesProps {
  useListMovies?: ListMoviesViewModel;
}

export default function ListMovies({
  useListMovies = _useListMovies,
}: ListMoviesProps) {
  const {
    state: {idPlaylist},
  } = usePlaylistStore();
  const {dataMovies, title, handleOnSearch} = useListMovies({idPlaylist});
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={10}>
          <SearchHeader
            title={title}
            onSearch={handleOnSearch}
            titleProps={{
              fontSize: '3xl',
            }}
          />
        </S.Box>
      }>
      <RenderIF condition={!!dataMovies && dataMovies.length > 0}>
        <List dataMovies={dataMovies!} />
      </RenderIF>
    </SharedLayout>
  );
}
