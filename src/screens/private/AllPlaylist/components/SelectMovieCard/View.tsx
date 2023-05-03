import React from 'react';
import CardMovie, {
  CardMoviesProps,
} from '../../../../../components/CardMovie/View';
import {useSelectedMoviesStore} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';

import * as S from 'native-base';
import {Check} from 'phosphor-react-native';

export default function SelectMovieCard({...rest}: CardMoviesProps) {
  const {
    state: {selectedMovies},
    addToSelected,
    removeToSelected,
  } = useSelectedMoviesStore();

  const isSelected = selectedMovies.find(movie => movie.id === rest.id);

  function toggleSelected() {
    isSelected ? removeToSelected(rest) : addToSelected(rest);
  }
  return (
    <CardMovie
      {...rest}
      onPress={toggleSelected}
      stackStyle={{
        position: 'relative',
      }}>
      {isSelected && (
        <S.Circle
          zIndex={20}
          p={2}
          backgroundColor="orange.500"
          position="absolute"
          top={1}
          right={1}>
          <Check size={10} color="#fff" />
        </S.Circle>
      )}
    </CardMovie>
  );
}
