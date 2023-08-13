import React from 'react';

import {Playlist} from '@database';

import {Box, Button, Text} from '@components';

interface DeleteLibraryProps {
  library: (Playlist & Realm.Object<Playlist, never>) | null;
  onConfirmation(): void;
}

export function ListMoviesConfirmDelete({
  library,
  onConfirmation,
}: DeleteLibraryProps) {
  return (
    <>
      <Box
        alignItems="center"
        justifyContent="center"
        width={'80%'}
        backgroundColor="background"
        gap="xl"
        padding={'xl'}
        borderRadius="s">
        <Text
          paddingTop="l"
          color="alertSucess"
          fontWeight={'500'}
          fontSize={30}>
          {library?.title ?? ''}
        </Text>
        <Button onPress={onConfirmation}>Confirmar</Button>
      </Box>
    </>
  );
}
