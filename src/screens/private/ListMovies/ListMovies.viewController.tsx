import React from 'react';

import {Playlist, useObject} from '@database';
import {usePlaylistStore} from '@store';

import ListMovies from './ListMovies.view';
import {useListMoviesViewModel} from './ListMovies.viewModel';

type Props = {};

export function ListMoviesViewController({}: Props) {
  const {
    state: {idPlaylist},
  } = usePlaylistStore();

  const library = useObject(Playlist, idPlaylist!);

  const viewModel = useListMoviesViewModel(library);
  return (
    <ListMovies title={library ? library.title : ''} viewModel={viewModel} />
  );
}
