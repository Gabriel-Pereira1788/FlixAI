/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {Modal} from '@components';

import Providers from './src/providers';
import Router from './src/router/Router';
import {MAIN} from './src/styles/theme';

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
