import React, {useState} from 'react';

import {Check} from 'phosphor-react-native';

import {Box, MovieBox, RenderIF} from '@components';

import {Movie} from '../../../../models/Movie';

type Props = {
  dataMovie: Movie;
  w?: number;
  h?: number;
  testID?: string;
  toggleIsSelectedStore: (dataMovie: Movie, isSelected: boolean) => void;
};

export function SelectCardMovie({
  dataMovie,
  w,
  h,
  testID,
  toggleIsSelectedStore,
}: Props) {
  const [isSelected, setIsSelected] = useState(false);

  function overrideToggleIsSelected() {
    toggleIsSelectedStore(dataMovie, isSelected);
    setIsSelected(!isSelected);
  }
  return (
    <MovieBox
      testID={testID || 'selected-card'}
      dataMovie={dataMovie}
      w={w}
      h={h}
      onPress={overrideToggleIsSelected}>
      <RenderIF condition={!!isSelected}>
        <Box
          borderRadius="full"
          testID="selected"
          zIndex={20}
          p={'s'}
          backgroundColor="orange"
          position="absolute"
          top={-5}
          right={-5}>
          <Check size={10} color="#fff" />
        </Box>
      </RenderIF>
    </MovieBox>
  );
}
