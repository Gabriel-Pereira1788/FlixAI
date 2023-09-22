import React from 'react';

import {SIZES, ERROR_DEFAULT} from '@constants';

import {Box, IBoxProps, Loading, RenderIF} from '@components';

import ErrorMessage from '../ErrorMessage/View';

type Props = {
  children: React.ReactNode;
  error?: unknown;
  HeaderComponent?: JSX.Element;
  BottomComponent?: JSX.Element;
  containerStyle?: IBoxProps;
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
    <Box
      testID="containerStack"
      width="100%"
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
      py={'xs'}
      backgroundColor="background"
      gap={'m'}
      {...containerStyle}>
      <RenderIF
        condition={!isLoadingData && !error}
        AlternativeComponent={
          error ? (
            <ErrorMessage message={ERROR_DEFAULT} />
          ) : (
            <Box
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
            </Box>
          )
        }>
        {HeaderComponent && HeaderComponent}
        {children}
      </RenderIF>
      {BottomComponent && BottomComponent}
    </Box>
  );
}
