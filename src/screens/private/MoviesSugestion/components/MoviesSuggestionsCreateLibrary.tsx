import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import {Movie} from '@models';
import {BlurView} from '@react-native-community/blur';
import {Plus} from 'phosphor-react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Box, CreateLibrary, modalRef} from '@components';

type Props = {
  moviesList?: Movie[];
};

export function MoviesSuggestionsCreateLibrary({moviesList}: Props) {
  function openModal() {
    if (moviesList && moviesList.length > 0) {
      modalRef.current?.show(
        <CreateLibrary moviesListToAdd={moviesList} />,
        'slide',
      );
    }
  }

  return (
    <Box
      flexDirection="row"
      position="absolute"
      zIndex={10}
      bottom={80}
      width="100%"
      p="xs"
      px="m"
      alignItems="center"
      justifyContent="flex-start">
      <Animated.View
        style={$animatedContainerStyle}
        entering={FadeInDown.delay(500).duration(150)}>
        <TouchableOpacity testID="button" onPress={openModal}>
          <View testID="plus-icon" style={$blurWrapper}>
            <BlurView
              style={$blurContainerStyle}
              blurType="dark"
              blurAmount={10}
            />

            <Plus size={25} color="#f97316" weight="bold" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Box>
  );
}

const $blurWrapper: ViewStyle = {
  borderRadius: 500,
  overflow: 'hidden',
  padding: 28,
};

const $blurContainerStyle: ViewStyle = {
  position: 'absolute',

  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

const $animatedContainerStyle: ViewStyle = {
  marginLeft: 10,
};
