import {QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import queryClient from '../repositories/api/config/queryClient';
import {MAIN} from '../styles/theme';
import {ThemeProvider} from '@shopify/restyle';
import theme from '../styles/designSystem';

type Props = {children: React.ReactNode};
const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

export default function JestProviders({children}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <NativeBaseProvider theme={MAIN} initialWindowMetrics={inset}>
        <GestureHandlerRootView style={{flex: 1}}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
