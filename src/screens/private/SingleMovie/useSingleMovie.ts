import {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SingleMovieViewModel} from './models';
import {useQuery} from '@tanstack/react-query';
import {MoviesApi} from '../../../repositories/services/api/modules/movies/movies';

export const useSingleMovie: SingleMovieViewModel = ({id}) => {
  const valueAnimated = useSharedValue('middle');
  const {data, isLoading, error} = useQuery(
    ['singleMovie', id],
    () => MoviesApi.findById(id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

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

  function toggleMostView(event: GestureEvent<PanGestureHandlerEventPayload>) {
    const translationY = event.nativeEvent.translationY;

    if (translationY > 50) {
      valueAnimated.value = ' middle';
    } else {
      valueAnimated.value = 'full';
    }
  }

  return {
    stylesAnimation,
    styleRotate,
    dataMovie: data,
    error: !!error,
    loading: isLoading,
    toggleMostView,
  };
};
