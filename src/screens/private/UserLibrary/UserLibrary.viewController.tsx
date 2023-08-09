import React from 'react';

import {usePlaylist} from '@database';
import {usePlaylistStore} from '@store';

import UserLibraryView from './UserLibrary.view';
import {useUserLibrary} from './UserLibrary.viewModel';

type Props = {};

export function UserLibraryViewController({}: Props) {
  const dataPlaylists = usePlaylist();
  const {selectPlaylist} = usePlaylistStore();
  const viewModel = useUserLibrary({dataPlaylists, selectPlaylist});

  return <UserLibraryView viewModel={viewModel} />;
}
