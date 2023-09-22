import React from 'react';

import {Box, Button, Text, IBoxProps, InputAuth} from '@components';

import {CreateLibraryMoviesList} from './components';
import {CreateLibraryProps} from './types';

export function CreateLibraryView({
  moviesListToAdd,
  viewModel,
}: CreateLibraryProps) {
  const {titleLibrary, handleChangeTitleLibrary, handleCreateLibrary} =
    viewModel;

  return (
    <Box
      {...$boxStyle}
      style={{
        backgroundColor: 'rgba(15, 15, 22, 1)',
      }}>
      <Text variant="titleLibrary">{titleLibrary}</Text>
      <CreateLibraryMoviesList moviesListToAdd={moviesListToAdd} />
      <InputAuth
        placeholder="Nome para a biblioteca..."
        value={titleLibrary}
        onChangeText={handleChangeTitleLibrary}
      />
      <Button onPress={handleCreateLibrary}>Confirmar</Button>
    </Box>
  );
}

const $boxStyle: IBoxProps = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '80%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  borderTopStartRadius: 'xl',
  borderTopEndRadius: 'xl',
  padding: 'l',
  gap: 'xs',
};
