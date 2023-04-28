import {
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {Movie} from '../../../models/Movie';

export type MostView = (
  event: GestureEvent<PanGestureHandlerEventPayload>,
) => void;

interface HookProps {
  id: string | number;
}

export type SingleMovieViewModel = (props: HookProps) => {
  dataMovie?: Movie;
  loading: boolean;
  error: boolean;
  stylesAnimation: {
    flex: 1 | 3.5;
  };
  styleRotate: {
    transform: {
      rotate: string;
    }[];
  };
  toggleMostView: MostView;
};
