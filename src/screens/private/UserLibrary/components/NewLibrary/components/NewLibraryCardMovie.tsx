import React from 'react';

import * as S from 'native-base';
import {Check} from 'phosphor-react-native';

import {CardMovie, CardMoviesProps} from '@components';

interface Props extends CardMoviesProps {
  isSelected: boolean;
  toggleSelected(): void;
}

export function NewLibraryCardMovie({
  isSelected,
  toggleSelected,
  ...rest
}: Props) {
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
