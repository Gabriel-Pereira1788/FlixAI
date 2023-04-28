import React from 'react';
import * as S from 'native-base';
type Props = {
  children: React.ReactNode;
  HeaderComponent?: JSX.Element;
  BottomComponent?: JSX.Element;
  containerStyle?: S.IZStackProps;
};

export default function SharedLayout({
  children,
  HeaderComponent,
  BottomComponent,
  containerStyle,
}: Props) {
  return (
    <S.VStack
      w="100%"
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
      py={2}
      backgroundColor="background.main"
      space={2}
      {...containerStyle}>
      {HeaderComponent && HeaderComponent}
      {children}
      {BottomComponent && BottomComponent}
    </S.VStack>
  );
}
