import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IDataMovie} from '../../../models/Movie';
import {RootParamListI} from '../../../router/navigation';

type HookProps = {
  navigation: NativeStackNavigationProp<
    RootParamListI,
    'SelectMovies',
    undefined
  >;
};

export type SelectMoviesViewModel = (props: HookProps) => {
  dataMovies: IDataMovie[] | undefined;
  loading: boolean;
};
