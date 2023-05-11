import React from 'react';
import * as S from 'native-base';
import {Warning} from 'phosphor-react-native';
interface ErrorMessageProps {
  message: string;
  children?: React.ReactNode;
}

export default function ErrorMessage({message, children}: ErrorMessageProps) {
  return (
    <S.VStack
      testID="container-error"
      flex={1}
      alignItems="center"
      justifyContent="center"
      space={2}>
      {children ? (
        children
      ) : (
        <S.Box testID="container-icon">
          <Warning size={45} color="#991b1b" />
        </S.Box>
      )}
      <S.Text fontWeight={500} color="#a3a1a1" fontSize="lg">
        {message}
      </S.Text>
    </S.VStack>
  );
}
