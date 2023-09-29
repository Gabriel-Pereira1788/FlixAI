import React from 'react';

import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import queryClient from '../repositories/api/config/queryClient';
import theme from '../styles/designSystem';

type Props = {children: React.ReactNode};

export default function JestProviders({children}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider
        initialMetrics={{
          frame: {x: 0, y: 0, width: 320, height: 640},
          insets: {top: 0, left: 0, right: 0, bottom: 0},
        }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
