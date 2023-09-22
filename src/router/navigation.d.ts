import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppTabParamList} from './AppTabNavigator';

export type RootParamListI = {
  SplashScreen: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home:
    | undefined
    | {
        screen: keyof AppTabParamList;
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
