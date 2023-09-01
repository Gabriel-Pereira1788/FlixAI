import {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import {useSingleMovieViewModel} from './SingleMovie.viewModel';

export type MostView = (
  event: GestureEvent<PanGestureHandlerEventPayload>,
) => void;

export type SingleMovieViewModel = ReturnType<typeof useSingleMovieViewModel>;
