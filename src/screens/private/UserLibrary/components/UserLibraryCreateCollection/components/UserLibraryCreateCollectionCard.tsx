import React from 'react';

import {Check} from 'phosphor-react-native';

import {Box, CardMovie, CardMoviesProps} from '@components';

interface Props extends CardMoviesProps {
  isSelected: boolean;
  toggleSelected(): void;
}

export function UserLibraryCreateCollectionCard({
  isSelected,
  toggleSelected,
  ...rest
}: Props) {
  return (
    <CardMovie
      testID="select-card"
      {...rest}
      onPress={toggleSelected}
      stackStyle={{
        position: 'relative',
        overflow: 'hidden',
      }}>
      {isSelected && (
        <Box
          testID="icon-selected"
          zIndex={20}
          padding={'s'}
          borderRadius="full"
          backgroundColor="orange"
          position="absolute"
          top={1}
          right={1}>
          <Check size={15} color="#fff" />
        </Box>
      )}
    </CardMovie>
  );
}
