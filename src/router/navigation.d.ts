import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootParamListI = {
  Home:
    | undefined
    | {
        screen: 'sugestions' | 'allPlaylist' | 'movies';
      };
  ListMovies: undefined;
  SingleMovie: {
    idMovie: number;
  };
  SelectMovies: undefined;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamListI {}
  }
}
export type NavigationProps<T = keyof RootParamListI> = NativeStackScreenProps<
  RootParamListI,
  T
>;
