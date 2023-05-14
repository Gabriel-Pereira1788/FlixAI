import React from 'react';

import * as S from 'native-base';
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {CaretUp} from 'phosphor-react-native';
import Poster from './components/Poster/View';
import {useSingleMovie as _useSingleMovie} from './useSingleMovie';
import Info from './components/Info/View';
import ListCast from './components/ListCast/View';
import {NavigationProps} from '../../../router/navigation';
import {SingleMovieViewModel} from './models';
import Header from './components/Header/View';
import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';
import {usePlaylist} from '../../../repositories/database/useCases/Playlist/usePlaylist';
import RenderIF from '../../../components/RenderIF/View';
import Loading from '../../../components/Loading/View';

interface SingleMovieProps extends NavigationProps<'SingleMovie'> {
  useSingleMovie?: SingleMovieViewModel;
  usePlaylistImpl?: PlaylistImpl;
}
export default function SingleMovie({
  route,
  useSingleMovie = _useSingleMovie,
  usePlaylistImpl = usePlaylist,
}: SingleMovieProps) {
  const {idMovie} = route.params;

  const {
    styleRotate,
    stylesAnimation,
    dataMovie,
    focused,
    loading,
    toggleMostView,
  } = useSingleMovie({id: idMovie});

  const {findMovieInPlaylist} = usePlaylistImpl();
  return (
    <S.VStack
      flex={1}
      justifyContent="center"
      backgroundColor="background.main">
      <RenderIF
        condition={!loading && focused}
        AlternativeComponent={
          <S.VStack
            testID="loading"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <Loading typeLoading="simple" />
          </S.VStack>
        }>
        <Header movie={dataMovie} playlistImpl={{findMovieInPlaylist}} />
        {dataMovie && dataMovie.poster_path && (
          <Poster imagePath={`${dataMovie.poster_path}`} />
        )}
        <PanGestureHandler
          testID="gesture-element"
          onGestureEvent={e => toggleMostView(e.nativeEvent.translationY)}
          activeOffsetY={[-20, 20]}
          activeOffsetX={[-20, 20]}
          failOffsetX={[-20, 1000]}>
          <Animated.View testID="container-view" style={[stylesAnimation]}>
            <S.HStack
              my={3}
              w="100%"
              alignItems="center"
              justifyContent="center">
              <Animated.View testID="arrow-rotate" style={styleRotate}>
                <CaretUp size={30} color="#fff" />
              </Animated.View>
            </S.HStack>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#0f0f16',
              }}>
              <Info {...dataMovie!} />

              <ListCast cast={dataMovie?.cast} />
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </RenderIF>
    </S.VStack>
  );
}
