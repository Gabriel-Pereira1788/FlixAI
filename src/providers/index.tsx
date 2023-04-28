import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {MAIN} from '../styles/theme';

import queryClient from '../repositories/services/config/queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from '../repositories/database/db';

type Props = {children: React.ReactNode};

export default function Providers({children}: Props) {
  return (
    <NativeBaseProvider theme={MAIN}>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <RealmProvider>{children}</RealmProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
