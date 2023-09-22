import React from 'react';

import {IBoxProps, SharedLayout} from '@components';

import {UserLibraryHeader, UserLibraryList} from './components';
import {UserLibraryViewModel} from './types';

interface Props {
  viewModel: UserLibraryViewModel;
}

export default function UserLibraryView({viewModel}: Props) {
  const {allPlaylists, fetchPlaylists, handleSelectLibrary} = viewModel;

  return (
    <SharedLayout
      HeaderComponent={<UserLibraryHeader onSearch={fetchPlaylists} />}
      containerStyle={$sharedContainerStyle}>
      <UserLibraryList
        allPlaylists={allPlaylists}
        selectLibrary={handleSelectLibrary}
      />
    </SharedLayout>
  );
}

const $sharedContainerStyle: IBoxProps = {
  justifyContent: 'flex-start',
  alignItems: 'center',
};
