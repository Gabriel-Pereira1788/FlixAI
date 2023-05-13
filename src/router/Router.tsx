import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PlaylistSugestion from '../screens/private/PlaylistSugestion/View';
import AllPlaylist from '../screens/private/AllPlaylist/View';
import ListMovies from '../screens/private/ListMovies/View';
import {RootParamListI} from './navigation';
import SingleMovie from '../screens/private/SingleMovie/View';
import SelectMovies from '../screens/private/SelectMovies/View';
import Movies from '../screens/private/Movies/View';
import SignIn from '../screens/public/SignIn/View';
import SignUp from '../screens/public/SignUp/View';
import MyAccount from '../screens/private/MyAccount/View';
import {useUser} from '../store/server/useUser';

type Props = {};

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};
const NativeStack = createNativeStackNavigator();

function Home() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => <></>,
      }}>
      <NativeStack.Screen name="sugestions" component={PlaylistSugestion} />
      <NativeStack.Screen name="allPlaylist" component={AllPlaylist} />
      <NativeStack.Screen name="movies" component={Movies} />
      <NativeStack.Screen name="myAccount" component={MyAccount} />
    </NativeStack.Navigator>
  );
}

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
              component={Home}
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
