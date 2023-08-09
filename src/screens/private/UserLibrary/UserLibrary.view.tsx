import React from 'react';

import {IZStackProps} from 'native-base';

import {BottomTab, SharedLayout} from '@components';

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
      BottomComponent={<BottomTab currentPath="userLibrary" />}
      containerStyle={$sharedContainerStyle}>
      <UserLibraryList
        allPlaylists={allPlaylists}
        selectLibrary={handleSelectLibrary}
      />
    </SharedLayout>
  );
}

const $sharedContainerStyle: IZStackProps = {
  justifyContent: 'flex-start',
  alignItems: 'center',
};
