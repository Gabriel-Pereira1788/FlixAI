import React from 'react';
import CardMovie, {
  CardMoviesProps,
} from '../../../../../components/CardMovie/View';
import {
  SelectedMoviesStoreImpl,
  useSelectedMoviesStore as _useSelectedMoviesStore,
} from '../../../../../store/client/SelectMovies/useSelectedMoviesStore';

import * as S from 'native-base';
import {Check} from 'phosphor-react-native';

interface SelectMovieProps extends CardMoviesProps {
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
}

export default function SelectMovieCard({
  useSelectedMoviesStore = _useSelectedMoviesStore,
  ...rest
}: SelectMovieProps) {
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
      testID="select-card"
      {...rest}
      onPress={toggleSelected}
      stackStyle={{
        position: 'relative',
      }}>
      {isSelected && (
        <S.Circle
          testID="icon-selected"
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
