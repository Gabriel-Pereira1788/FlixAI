/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {MAIN} from './src/styles/theme';
import Providers from './src/providers';
import {Modal} from '@components';
import Router from './src/router/Router';

function App(): JSX.Element {
  return (
    <Providers>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={MAIN.colors.background.main}
      />
      <Router />
      <Modal />
    </Providers>
  );
}

export default App;
