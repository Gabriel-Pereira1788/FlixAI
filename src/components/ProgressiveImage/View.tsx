import React from 'react';
import * as S from 'native-base';
import Animated, {AnimateProps} from 'react-native-reanimated';
import {ImageProps, StyleSheet} from 'react-native';
interface ProgressiveImageProps extends AnimateProps<ImageProps> {
  containerProps?: S.IBoxProps;
  thumbnailSource: string;
  children?: React.ReactNode;
}

export default function ProgressiveImage({
  containerProps,
  thumbnailSource,
  children,
  ...rest
}: ProgressiveImageProps) {
  return (
    <S.Box position="relative">
      {children && children}
      <S.Box
        overflow="hidden"
        backgroundColor="background.main"
        {...containerProps}>
        <Animated.Image
          testID="thumbnailId"
          {...rest}
          source={{uri: thumbnailSource}}
        />
        <Animated.Image
          testID="imageOverlay"
          {...rest}
          style={[styles.imageOverlay, rest.style]}
        />
      </S.Box>
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
