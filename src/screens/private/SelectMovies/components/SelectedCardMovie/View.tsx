import React from 'react';

import * as S from 'native-base';
import {Check} from 'phosphor-react-native';

import {RenderIF} from '../../../../../components/Atoms/RenderIF/View';
import {MovieBox} from '../../../../../components/Organisms/MovieBox/View';
import {Movie} from '../../../../../models/Movie';
import {
  SelectedMoviesStoreImpl,
  useSelectedMoviesStore as _useSelectedMoviesStore,
} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';

type Props = {
  dataMovie: Movie;
  w?: number;
  h?: number;
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
  testID?: string;
};

export function SelectedCardMovie({
  dataMovie,
  w,
  h,
  testID,
  useSelectedMoviesStore = _useSelectedMoviesStore,
}: Props) {
  const {
    state: {selectedMovies},
    addToSelected,
  } = useSelectedMoviesStore();

  const isSelected = selectedMovies.find(movie => movie.id === dataMovie.id);
  return (
    <MovieBox
      testID={testID || 'selected-card'}
      dataMovie={dataMovie}
      w={w}
      h={h}
      onPress={() => addToSelected(dataMovie)}>
      <RenderIF condition={!!isSelected}>
        <S.Circle
          testID="selected"
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
