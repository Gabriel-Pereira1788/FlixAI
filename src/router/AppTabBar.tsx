import React from 'react';
import {TouchableOpacity} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useUser} from '@store';
import {$shadowProps} from '@styles';
import {
  MagnifyingGlass,
  Popcorn,
  Queue,
  UserCircle,
} from 'phosphor-react-native';

import {Box, IBoxProps, Image, RenderIF} from '@components';
import {useAppSafeArea} from '@hooks';

import {AppTabParamList} from './AppTabNavigator';
import {mapScreenToProps} from './mapScreenToProps';

export function AppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {bottom} = useAppSafeArea();
  return (
    <Box
      {...$boxWrapper}
      style={[
        {paddingBottom: bottom, backgroundColor: 'rgba(0,0,0,0.8)'},
        $shadowProps,
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const tabItem = mapScreenToProps[route.name as keyof AppTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Icon
              iconName={tabItem.iconName}
              color={isFocused ? '#f97316' : '#ffffffc3'}
            />
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}

type IconProps = {
  iconName?: 'magnifingGlass' | 'queue' | 'popcorn' | 'user';
  color: string;
};

const Icon = ({iconName, color}: IconProps) => {
  const {user} = useUser();
  switch (iconName) {
    case 'magnifingGlass':
      return <MagnifyingGlass size={30} color={color} weight="bold" />;
    case 'queue':
      return <Queue size={30} color={color} weight="bold" />;
    case 'popcorn':
      return <Popcorn size={30} color={color} weight="bold" />;
    case 'user':
      return (
        <RenderIF
          condition={!!user && !!user?.photoURL}
          AlternativeComponent={
            <UserCircle size={30} color={'#ffffffc3'} weight="bold" />
          }>
          <Image
            variant="userImage"
            source={{
              uri: user?.photoURL ?? '',
            }}
            alt="image-user"
            width={30}
            height={30}
          />
        </RenderIF>
      );
    default:
      return <></>;
  }
};

const $boxWrapper: IBoxProps = {
  paddingTop: 'm',
  position: 'absolute',
  bottom: 0,
  borderTopLeftRadius: 'l',
  borderTopRightRadius: 'l',
  flexDirection: 'row',
};
