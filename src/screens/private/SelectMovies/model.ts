import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IDataMovie, Movie} from '../../../models/Movie';
import {RootParamListI} from '../../../router/navigation';
import {PlaylistDTO} from '../../../models/Playlist';

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
  selectedMovies: Movie[];
  addToSelected(movie: Movie): void;
  onCreate: (dataPlaylist: PlaylistDTO) => Promise<void>;
};
