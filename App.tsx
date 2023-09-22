/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import {Toast, Modal} from '@components';

import Providers from './src/providers';
import Router from './src/router/Router';
import {palette} from './src/styles/designSystem/colors_variants';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Providers>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={palette.backgroundMain}
      />
      <View style={{flex: 1, backgroundColor: palette.backgroundMain}}>
        <Router />
      </View>
      <Modal />
      <Toast />
    </Providers>
  );
}

export default App;
