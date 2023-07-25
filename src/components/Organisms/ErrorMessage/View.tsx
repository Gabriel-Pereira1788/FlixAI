import React from 'react';
import {Warning} from 'phosphor-react-native';
import {Box, Text} from '@components/atoms';
interface ErrorMessageProps {
  message: string;
  children?: React.ReactNode;
}

export default function ErrorMessage({message, children}: ErrorMessageProps) {
  return (
    <Box
      testID="container-error"
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap={'xs'}>
      {children ? (
        children
      ) : (
        <Box testID="container-icon">
          <Warning size={45} color="#991b1b" />
        </Box>
      )}
      <Text fontWeight={'500'} color="grayLightTextColor" fontSize={30}>
        {message}
      </Text>
    </Box>
  );
}
