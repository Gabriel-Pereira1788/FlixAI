import React from 'react';
import * as S from 'native-base';
import SharedLayout from '../../../components/SharedLayout/View';
import {ListMoviesViewModel} from './model';
import {useListMovies as _useListMovies} from './useListMovies';
import SearchHeader from '../../../components/SearchHeader/View';
import List from './components/List/View';
import RenderIF from '../../../components/RenderIF/View';
import {usePlaylistStore} from '../../../store/client/PlaylistStore/usePlaylistStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Trash} from 'phosphor-react-native';
import {NavigationProps} from '../../../router/navigation';
import {modalRef} from '../../../components/Modal/View';
import DeleteLibrary from './components/DeleteLibrary/View';

interface ListMoviesProps extends NavigationProps<'ListMovies'> {
  useListMovies?: ListMoviesViewModel;
}

export default function ListMovies({
  useListMovies = _useListMovies,
  navigation,
}: ListMoviesProps) {
  const {
    state: {idPlaylist},
  } = usePlaylistStore();

  const {moviesList, title, library, handleOnSearch} = useListMovies({
    idPlaylist,
  });

  function openModal() {
    modalRef.current?.show(() => (
      <DeleteLibrary library={library} goBack={navigation.goBack} />
    ));
  }

  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={10}>
          <SearchHeader
            title={title}
            listenEventSearch={handleOnSearch}
            RightComponent={
              <TouchableOpacity onPress={openModal}>
                <Trash color="#fff" size={25} weight="bold" />
              </TouchableOpacity>
            }
            titleProps={{
              fontSize: '3xl',
            }}
          />
        </S.Box>
      }>
      <RenderIF condition={!!moviesList && moviesList.length > 0}>
        <List moviesList={moviesList!} />
      </RenderIF>
    </SharedLayout>
  );
}
