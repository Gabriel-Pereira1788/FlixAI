import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Realm} from '@realm/react';

export type RootParamListI = {
  Home:
    | undefined
    | {
        screen: 'sugestions' | 'allPlaylist';
      };
  ListMovies: {
    idList: Realm.BSON.ObjectId;
  };
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
