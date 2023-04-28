import React from 'react';
import * as S from 'native-base';

interface ButtonProps extends S.IButtonProps {}

export default function Button({...rest}: ButtonProps) {
  return (
    <S.Button
      disabled={rest.isLoading}
      _pressed={{
        opacity: 0.8,
      }}
      width="100%"
      p={3}
      py={4}
      backgroundColor="orange.500"
      borderRadius="2xl"
      _text={{
        fontWeight: 500,
        fontSize: 'md',
      }}
      {...rest}
    />
  );
}
