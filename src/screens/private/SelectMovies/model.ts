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
  searchText: string;
  dataMovies: IDataMovie[] | undefined;
  loading: boolean;
  selectedMovies: Movie[];
  addToSelected(movie: Movie): void;
  handleChange(value: string): void;
  onCreate: (dataPlaylist: PlaylistDTO) => Promise<void>;
};
