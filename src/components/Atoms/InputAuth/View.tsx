import React from 'react';

import {Box, Input, Text, RenderIF} from '../index';
import {DSInputProps} from '../Input/View';
export interface InputProps extends DSInputProps {
  error?: string;
}

export function InputAuth({error, ...rest}: InputProps) {
  return (
    <Box width="100%" alignItems="flex-start" justifyContent="center" gap={'s'}>
      <Input variant={error ? 'error' : 'auth'} {...rest} />
      <RenderIF condition={!!error}>
        <Text
          paddingHorizontal={'xs'}
          color="redTextColor"
          fontWeight={'500'}
          fontSize={10}>
          {error}
        </Text>
      </RenderIF>
    </Box>
  );
}
