import {Realm} from '@realm/react';
import {Movie} from '../../../models/Movie';

interface HookProps {
  idList: Realm.BSON.ObjectId;
}

export type ListMoviesViewModel = ({idList}: HookProps) => {
  dataMovies: Movie[];
  title: string;
};
