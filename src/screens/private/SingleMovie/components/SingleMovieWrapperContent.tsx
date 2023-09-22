import React from 'react';

import {CaretUp} from 'phosphor-react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Box} from '@components';

type Props = {
  children: React.ReactNode;
};

export function SingleMovieWrapperContent({children}: Props) {
  const valueAnimated = useSharedValue('middle');
  const stylesAnimation = useAnimatedStyle(() => {
    return {
      flex: withTiming(valueAnimated.value === 'full' ? 3.5 : 1, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const styleRotate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(
            valueAnimated.value === 'full' ? '180deg' : '0deg',
            {
              duration: 500,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
          ),
        },
      ],
    };
  });

  function toggleMostView(translationY: number) {
    if (translationY > 50) {
      valueAnimated.value = ' middle';
    } else {
      valueAnimated.value = 'full';
    }
  }
  return (
    <PanGestureHandler
      testID="gesture-element"
      onGestureEvent={e => toggleMostView(e.nativeEvent.translationY)}
      activeOffsetY={[-20, 20]}
      activeOffsetX={[-20, 20]}
      failOffsetX={[-20, 1000]}>
      <Animated.View testID="container-view" style={[stylesAnimation]}>
        <Box
          flexDirection="row"
          my={'s'}
          width="100%"
          alignItems="center"
          justifyContent="center">
          <Animated.View testID="arrow-rotate" style={styleRotate}>
            <CaretUp size={30} color="#fff" />
          </Animated.View>
        </Box>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}
