import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {Movies, MoviesSuggestion, MyAccount, UserLibrary} from '@screens';

import {AppTabBar} from './AppTabBar';

export type AppTabParamList = {
  SuggestionsScreen: undefined;
  UserLibraryScreen: undefined;
  MoviesScreen: undefined;
  MyAccountScreen: undefined;
};
const Tab = createBottomTabNavigator<AppTabParamList>();
export function AppTabNavigation() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#fff',
      }}>
      <Tab.Screen
        name="SuggestionsScreen"
        component={MoviesSuggestion}
        options={{
          headerLeft: () => <></>,
        }}
      />
      <Tab.Screen
        name="UserLibraryScreen"
        component={UserLibrary}
        options={{
          headerLeft: () => <></>,
        }}
      />
      <Tab.Screen
        name="MoviesScreen"
        component={Movies}
        options={{
          headerLeft: () => <></>,
        }}
      />
      <Tab.Screen name="MyAccountScreen" component={MyAccount} />
    </Tab.Navigator>
  );
}
