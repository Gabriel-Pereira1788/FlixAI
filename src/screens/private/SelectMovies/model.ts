import {PlaylistImpl} from '@database';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SelectedMoviesStoreImpl, AllMoviesImpl} from '@store';

import {RootParamListI} from '../../../router/navigation';

import {_useSelectMovies} from './useSelectMovies';

export type HookProps = {
  navigation: NativeStackNavigationProp<
    RootParamListI,
    'SelectMovies',
    undefined
  >;
  useSelectedMoviesStore?: SelectedMoviesStoreImpl;
  usePlaylist?: PlaylistImpl;
  useAllMovies?: AllMoviesImpl;
};

export type SelectMoviesViewModel = (
  props: HookProps,
) => ReturnType<typeof _useSelectMovies>;
