import React from 'react';
import * as S from 'native-base';
import {useMoviesSugestion as _useMoviesSugestion} from './useMoviesSugestion';

import Animated, {FadeInDown} from 'react-native-reanimated';
import {MoviesSugestionViewModel} from './models';
//*components
import RenderIF from '../../../components/RenderIF/View';
import {modalRef} from '../../../components/Modal/View';
import AddPlaylist from '../../../components/AddPlaylist/View';
import AddToPlaylist from './components/AddToPlaylist/View';
import BottomTab from '../../../components/BottomTab/View';
import SharedLayout from '../../../components/SharedLayout/View';
import SearchHeader from '../../../components/SearchHeader/View';
import List from './components/List/View';
type Props = {
  useMoviesSugestion?: MoviesSugestionViewModel;
};

export default function MoviesSugestion({
  useMoviesSugestion = _useMoviesSugestion,
}: Props) {
  const {moviesList, username, textGpt, isLoading, error, onSearch, onCreate} =
    useMoviesSugestion({});

  function openModal() {
    if (moviesList && moviesList.length > 0) {
      modalRef.current?.show(
        () => <AddPlaylist listData={moviesList} onCreate={onCreate} />,
        'slide',
      );
    }
  }
  return (
    <SharedLayout
      error={error}
      isLoadingData={isLoading}
      HeaderComponent={
        <S.Box px={10} paddingTop={10}>
          <SearchHeader
            onSearch={onSearch}
            title={textGpt || `Olá ${username} oque precisa para hoje?`}
          />
        </S.Box>
      }
      BottomComponent={<BottomTab currentPath="sugestions" />}>
      <RenderIF condition={!isLoading && !!moviesList && moviesList.length > 0}>
        {moviesList && moviesList.length > 0 && <List data={moviesList} />}
        <S.HStack
          testID="container-add"
          position="absolute"
          zIndex={10}
          style={{bottom: '7%'}}
          w="100%"
          p={5}
          px={6}
          alignItems="center"
          justifyContent="flex-start">
          <Animated.View
            style={{marginLeft: 10}}
            entering={FadeInDown.delay(500).duration(150)}>
            <AddToPlaylist onPress={openModal} />
          </Animated.View>
        </S.HStack>
      </RenderIF>
    </SharedLayout>
  );
}
