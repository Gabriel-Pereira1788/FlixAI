import React from 'react';
import * as S from 'native-base';
import RenderIF from '../RenderIF/View';
import ErrorMessage from '../ErrorMessage/View';
import {ERROR_DEFAULT} from '../../helpers/constants/errorsMessage';
import Loading from '../Loading/View';
import {SIZES} from '../../helpers/constants/sizes';
type Props = {
  children: React.ReactNode;
  error?: unknown;
  HeaderComponent?: JSX.Element;
  BottomComponent?: JSX.Element;
  containerStyle?: S.IZStackProps;
  isLoadingData?: boolean;
  typeLoading?: 'IA' | 'simple';
};

export default function SharedLayout({
  children,
  error,
  HeaderComponent,
  BottomComponent,
  containerStyle,
  isLoadingData,
  typeLoading = 'IA',
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
        condition={!isLoadingData && !error}
        AlternativeComponent={
          error ? (
            <ErrorMessage message={ERROR_DEFAULT} />
          ) : (
            <S.VStack
              testID="loading"
              flex={1}
              alignItems="center"
              justifyContent="center">
              <Loading
                typeLoading={typeLoading}
                imageProps={{
                  width: SIZES.width - 125,
                  height: SIZES.width - 125,
                }}
              />
            </S.VStack>
          )
        }>
        {HeaderComponent && HeaderComponent}
        {children}
      </RenderIF>
      {BottomComponent && BottomComponent}
    </S.VStack>
  );
}
