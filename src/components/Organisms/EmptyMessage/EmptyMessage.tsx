import React from 'react';

import {Queue} from 'phosphor-react-native';

import {Box, Text} from '../../Atoms';
type Props = {
  message: string;
  children?: React.ReactNode;
};

export function EmptyMessage({message, children}: Props) {
  return (
    <Box
      flex={1}
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap={'m'}>
      <Queue color="#dddddd9b" size={100} />

      <Text color="grayDarkTextColor" paddingTop="l" fontSize={25}>
        {message}
      </Text>

      {children && children}
    </Box>
  );
}
