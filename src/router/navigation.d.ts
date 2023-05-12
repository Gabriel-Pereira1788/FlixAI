import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootParamListI = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home:
    | undefined
    | {
        screen: 'sugestions' | 'allPlaylist' | 'movies' | 'myAccount';
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
