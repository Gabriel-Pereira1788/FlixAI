import React from 'react';
import {ImageProps, StyleSheet, ViewStyle} from 'react-native';

import Animated, {AnimateProps} from 'react-native-reanimated';

import {IBoxProps, Box} from '@components';

interface ProgressiveImageProps extends AnimateProps<ImageProps> {
  containerProps?: IBoxProps & {style?: ViewStyle};
  thumbnailSource: string;
  children?: React.ReactNode;
}

export function ProgressiveImage({
  containerProps,
  thumbnailSource,
  children,
  ...rest
}: ProgressiveImageProps) {
  return (
    <Box position="relative">
      {children && children}
      <Box overflow="hidden" backgroundColor="background" {...containerProps}>
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
      </Box>
    </Box>
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
