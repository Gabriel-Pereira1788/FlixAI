import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootParamListI} from '../../../router/navigation';

import {SelectedMoviesStoreImpl} from '../../../store/client/SelectMovies/useSelectedMoviesStore';
import {PlaylistImpl} from '../../../repositories/database/useCases/Playlist/model';
import {AllMoviesImpl} from '../../../store/server/useAllMovies';
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
