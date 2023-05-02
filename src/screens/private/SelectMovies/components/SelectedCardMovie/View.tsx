import React from 'react';
import * as S from 'native-base';

import {Movie} from '../../../../../models/Movie';

import {Check} from 'phosphor-react-native';
import RenderIF from '../../../../../components/RenderIF/View';
import {useSelectedMoviesStore} from '../../../../../store/client/useSelectedMoviesStore';
import MovieBox from '../../../../../components/MovieBox/View';

type Props = {
  dataMovie: Movie;
  w?: number;
  h?: number;
};

export default function SelectedCardMovie({dataMovie, w, h}: Props) {
  const {
    actions: {addToSelected},
    state: {selectedMovies},
  } = useSelectedMoviesStore();

  const isSelected = selectedMovies.find(movie => movie.id === dataMovie.id);
  return (
    <MovieBox
      dataMovie={dataMovie}
      w={w}
      h={h}
      onPress={() => addToSelected(dataMovie)}>
      <RenderIF condition={!!isSelected}>
        <S.Circle
          zIndex={20}
          p={2}
          backgroundColor="orange.500"
          position="absolute"
          top={-5}
          right={-5}>
          <Check size={10} color="#fff" />
        </S.Circle>
      </RenderIF>
    </MovieBox>
  );
}
