import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import {SignUp, SignIn, ListMovies, SelectMovies, SingleMovie} from '@screens';

import {useUser} from '../store/server/useUser';

import {AppTabNavigation} from './AppTabNavigator';
import {RootParamListI} from './navigation';

type Props = {};

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

const Stack = createStackNavigator<RootParamListI>();

export default function Router({}: Props) {
  const {user} = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={TransitionScreenOptions}>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={AppTabNavigation}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="ListMovies"
              component={ListMovies}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="SingleMovie"
              component={SingleMovie}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="SelectMovies"
              component={SelectMovies}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerTintColor: '#fff',
                headerTransparent: true,
                headerTitle: '',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
