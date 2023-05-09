import {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import {useSingleMovie} from './useSingleMovie';
import {SingleMovieImpl} from '../../../store/server/useSingleMovie';

export type MostView = (
  event: GestureEvent<PanGestureHandlerEventPayload>,
) => void;

export interface HookProps {
  id: string | number;
  useSingleMovieImpl?: SingleMovieImpl;
}

export type SingleMovieViewModel = (
  props: HookProps,
) => ReturnType<typeof useSingleMovie>;
