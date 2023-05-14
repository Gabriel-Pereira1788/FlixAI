import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LaunchImage from '../../assets/launch.png';
import MovieImage from '../../assets/movie.png';
import {SIZES} from '../../helpers/constants/sizes';
import * as S from 'native-base';
import RenderIF from '../RenderIF/View';

interface LoadingProps {
  typeLoading: 'IA' | 'simple';
  imageProps?: S.IImageProps;
}

const INTERVALS = {
  loading_timeout: 1000,
  navigation_timeout: 15000,
};

export default function Loading({typeLoading, imageProps}: LoadingProps) {
  const isFocus = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isFocus.value ? 1.2 : 0.5, {
        damping: 2,
        stiffness: 20,
      }),
    };
  });
  React.useEffect(() => {
    const intervalLoading = setInterval(() => {
      isFocus.value = !isFocus.value;
    }, INTERVALS.loading_timeout);

    return () => {
      clearInterval(intervalLoading);
      console.log('unmount');
    };
  }, [isFocus]);
  return (
    <Animated.View style={animatedStyle}>
      <RenderIF
        condition={typeLoading === 'IA'}
        AlternativeComponent={
          <S.Image
            testID="movie-image"
            source={MovieImage}
            width={SIZES.width - 50}
            height={SIZES.width - 50}
            alt="launch-image"
            {...imageProps}
          />
        }>
        <S.Image
          testID="main-image"
          source={LaunchImage}
          width={SIZES.width - 50}
          height={SIZES.width - 50}
          alt="launch-image"
          {...imageProps}
        />
      </RenderIF>
    </Animated.View>
  );
}
