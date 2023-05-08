import React from 'react';
import * as S from 'native-base';
import RenderIF from '../RenderIF/View';
type Props = {
  children: React.ReactNode;
  HeaderComponent?: JSX.Element;
  BottomComponent?: JSX.Element;
  containerStyle?: S.IZStackProps;
  isLoadingData?: boolean;
};

export default function SharedLayout({
  children,
  HeaderComponent,
  BottomComponent,
  containerStyle,
  isLoadingData,
}: Props) {
  return (
    <S.VStack
      testID="containerStack"
      w="100%"
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
      py={2}
      backgroundColor="background.main"
      space={2}
      {...containerStyle}>
      <RenderIF
        condition={!isLoadingData}
        AlternativeComponent={
          <S.VStack
            testID="loading"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <S.Spinner color="orange.500" />
          </S.VStack>
        }>
        {HeaderComponent && HeaderComponent}
        {children}
      </RenderIF>
      {BottomComponent && BottomComponent}
    </S.VStack>
  );
}
