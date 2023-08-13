import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootParamListI} from '../../../router/navigation';

import {useSelectMoviesViewModel} from './SelectMovies.viewModel';

export type HookProps = {
  navigation: NativeStackNavigationProp<
    RootParamListI,
    'SelectMovies',
    undefined
  >;
};

export type SelectMoviesViewModel = ReturnType<typeof useSelectMoviesViewModel>;
