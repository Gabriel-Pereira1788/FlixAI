import React from 'react';
import * as S from 'native-base';

import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Movie} from '../../models/Movie';
import ProgressiveImage from '../ProgressiveImage/View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../helpers/constants/tmdb';

interface MovieBoxProps extends TouchableOpacityProps {
  dataMovie: Movie;
  w?: number;
  h?: number;
  children?: React.ReactNode;
}

export default function MovieBox({
  dataMovie,
  w,
  h,
  children,
  ...rest
}: MovieBoxProps) {
  const {backdrop_path, title} = dataMovie;

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(200)}>
      <TouchableOpacity {...rest}>
        <S.VStack m={5} space={2} alignItems="center" justifyContent="center">
          <ProgressiveImage
            source={{
              uri: `${TMBD_BACKDROP_URL}${backdrop_path}`,
            }}
            thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${backdrop_path}`}
            progressiveRenderingEnabled={true}
            containerProps={{
              style: {
                position: 'relative',
                borderRadius: 20,
                borderColor: '#dddddd35',
                borderWidth: 1,
              },
            }}
            style={{
              width: w || 200,
              height: h || 250,
            }}>
            {children && children}
          </ProgressiveImage>

          <S.Text fontWeight={500} color="#ddd" fontSize="md">
            {title}
          </S.Text>
        </S.VStack>
      </TouchableOpacity>
    </Animated.View>
  );
}
