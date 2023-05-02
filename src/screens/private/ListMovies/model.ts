import {Realm} from '@realm/react';
import {Movie} from '../../../models/Movie';

interface HookProps {
  idPlaylist: Realm.BSON.ObjectId | null;
}

export type ListMoviesViewModel = ({idPlaylist}: HookProps) => {
  dataMovies: Movie[];
  title: string;
};
