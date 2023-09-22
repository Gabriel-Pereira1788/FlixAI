import React from 'react';

import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import queryClient from '../repositories/api/config/queryClient';
import theme from '../styles/designSystem';

type Props = {children: React.ReactNode};

export default function JestProviders({children}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
