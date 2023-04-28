import React from 'react';
import * as S from 'native-base';
import Animated, {AnimateProps} from 'react-native-reanimated';
import {ImageProps, StyleSheet} from 'react-native';
interface ProgressiveImageProps extends AnimateProps<ImageProps> {
  containerProps?: S.IBoxProps;
  thumbnailSource: string;
}

export default function ProgressiveImage({
  containerProps,
  thumbnailSource,
  ...rest
}: ProgressiveImageProps) {
  return (
    <S.Box
      position="relative"
      overflow="hidden"
      backgroundColor="background.main"
      {...containerProps}>
      <Animated.Image {...rest} source={{uri: thumbnailSource}} />
      <Animated.Image {...rest} style={[styles.imageOverlay, rest.style]} />
    </S.Box>
  );
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
