import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootParamListI} from '../../../router/navigation';

import {SelectedMoviesStoreImpl, AllMoviesImpl} from '@store';
import {PlaylistImpl} from '@database';
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
