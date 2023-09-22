import {Realm} from '@realm/react';

import {useListMoviesViewModel} from './ListMovies.viewModel';

export interface HookProps {
  idPlaylist: Realm.BSON.ObjectId | null;
}

export type ListMoviesViewModel = ReturnType<typeof useListMoviesViewModel>;
