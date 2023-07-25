import React from 'react';

import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Movie} from '@models';
import {ProgressiveImage} from '@components/molecules';
import {TMBD_BACKDROP_PREVIEW, TMBD_BACKDROP_URL, SIZES} from '@constants';
import {Box, Text} from '@components/atoms';

interface MovieBoxProps extends TouchableOpacityProps {
  dataMovie: Movie;
  w?: number;
  h?: number;
  children?: React.ReactNode;
}

export function MovieBox({dataMovie, w, h, children, ...rest}: MovieBoxProps) {
  const {backdrop_path, title} = dataMovie;

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(200)}>
      <TouchableOpacity {...rest}>
        <Box
          margin="l"
          gap="m"
          alignItems="center"
          justifyContent="center"
          maxWidth={(SIZES.width / 100) * 70}>
          <ProgressiveImage
            testID="image"
            source={{
              uri: `${TMBD_BACKDROP_URL}${backdrop_path}`,
            }}
            thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${backdrop_path}`}
            progressiveRenderingEnabled={true}
            containerProps={{
              position: 'relative',
              borderRadius: 'm',
              borderColor: 'borderGray',
              borderWidth: 1,
            }}
            style={{
              width: w || 200,
              height: h || 250,
            }}>
            {children && children}
          </ProgressiveImage>

          <Text variant="movieTitle">{title}</Text>
        </Box>
      </TouchableOpacity>
    </Animated.View>
  );
}
