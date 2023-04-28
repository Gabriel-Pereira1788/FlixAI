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

interface SingleMovieProps extends NavigationProps<'SingleMovie'> {
  useSingleMovie?: SingleMovieViewModel;
}
export default function SingleMovie({
  route,
  useSingleMovie = _useSingleMovie,
}: SingleMovieProps) {
  const {idMovie} = route.params;

  const {styleRotate, stylesAnimation, dataMovie, toggleMostView} =
    useSingleMovie({id: idMovie});
  return (
    <S.VStack
      flex={1}
      justifyContent="center"
      backgroundColor="background.main">
      <Header movie={dataMovie} />
      {dataMovie && dataMovie.poster_path && (
        <Poster imagePath={`${dataMovie.poster_path}`} />
      )}
      <PanGestureHandler
        onGestureEvent={toggleMostView}
        activeOffsetY={[-20, 20]}
        activeOffsetX={[-20, 20]}
        failOffsetX={[-20, 1000]}>
        <Animated.View style={[stylesAnimation]}>
          <S.HStack my={3} w="100%" alignItems="center" justifyContent="center">
            <Animated.View style={styleRotate}>
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
    </S.VStack>
  );
}
