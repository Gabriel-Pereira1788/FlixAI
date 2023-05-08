import {Realm} from '@realm/react';
import {useListMovies} from './useListMovies';

export interface HookProps {
  idPlaylist: Realm.BSON.ObjectId | null;
}

export type ListMoviesViewModel = ({
  idPlaylist,
}: HookProps) => ReturnType<typeof useListMovies>;
