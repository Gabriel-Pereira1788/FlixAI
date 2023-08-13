import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {useSelectedMoviesStore} from '@store';
import {CaretRight} from 'phosphor-react-native';

import {Box, CreateLibrary, modalRef} from '@components';

type Props = {};

export function SelectMoviesCreateButton({}: Props) {
  const selectedMovies = useSelectedMoviesStore();

  function openModal() {
    if (selectedMovies.length > 0) {
      modalRef.current?.show(
        <CreateLibrary moviesListToAdd={selectedMovies} />,
        'slide',
      );
    }
  }

  if (selectedMovies.length < 0) {
    return null;
  }
  return (
    <TouchableOpacity testID="open-modal" onPress={openModal}>
      <Box
        borderRadius="full"
        overflow="hidden"
        p="l"
        position="absolute"
        bottom={15}
        right={15}>
        <BlurView style={$styleBlurContainer} blurType="dark" blurAmount={20} />
        <CaretRight size={23} color="#f97316" weight="bold" />
      </Box>
    </TouchableOpacity>
  );
}

const $styleBlurContainer: ViewStyle = {
  position: 'absolute',

  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};
