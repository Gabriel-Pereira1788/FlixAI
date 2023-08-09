import React from 'react';

import {SIZES, ERROR_DEFAULT} from '@constants';
import * as S from 'native-base';

import {Loading, RenderIF} from '@components';

import ErrorMessage from '../ErrorMessage/View';

type Props = {
  children: React.ReactNode;
  error?: unknown;
  HeaderComponent?: JSX.Element;
  BottomComponent?: JSX.Element;
  containerStyle?: S.IZStackProps;
  isLoadingData?: boolean;
  typeLoading?: 'IA' | 'simple';
};

export function SharedLayout({
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
