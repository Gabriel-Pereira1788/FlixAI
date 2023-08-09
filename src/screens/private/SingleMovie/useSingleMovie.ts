import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';
import {useSingleMovieServer} from '../../../store/server/useSingleMovie';

import {HookProps} from './models';

export const useSingleMovie = ({
  id,
  useSingleMovieImpl = useSingleMovieServer,
}: HookProps) => {
  const {focused} = useFocusedScreen();
  const {data, isLoading, error} = useSingleMovieImpl(id);

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

  return {
    valueAnimated,
    stylesAnimation,
    styleRotate,
    focused,
    dataMovie: focused ? data : undefined,
    error: !!error,
    loading: isLoading,
    toggleMostView,
  };
};
