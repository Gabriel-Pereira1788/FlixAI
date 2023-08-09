import React from 'react';
import {Platform} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useUser} from '@store';
import {
  MagnifyingGlass,
  Queue,
  Popcorn,
  UserCircle,
} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {RenderIF, Box, Image} from '@components';

interface BottomTabProps {
  currentPath: 'sugestions' | 'userLibrary' | 'movies';
}

export function BottomTab({currentPath}: BottomTabProps) {
  const navigation = useNavigation();
  const {user} = useUser();
  return (
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
      }}
      flexDirection="row"
      width="100%"
      gap="l"
      backgroundColor="bottomTabTransparent"
      paddingHorizontal={'xs'}
      paddingVertical={'m'}
      paddingBottom={Platform.OS === 'ios' ? 'l' : undefined}
      alignItems="center"
      justifyContent="center">
      <TouchableOpacity
        testID="sugestions"
        onPress={() => navigation.navigate('Home', {screen: 'sugestions'})}>
        <MagnifyingGlass
          size={30}
          color={currentPath === 'sugestions' ? '#f97316' : '#ffffffc3'}
          weight="bold"
        />
      </TouchableOpacity>
      <TouchableOpacity
        testID="userLibraryId"
        onPress={() => navigation.navigate('Home', {screen: 'userLibrary'})}>
        <Queue
          size={30}
          color={currentPath === 'userLibrary' ? '#f97316' : '#ffffffc3'}
          weight="bold"
        />
      </TouchableOpacity>
      <TouchableOpacity
        testID="moviesId"
        onPress={() => navigation.navigate('Home', {screen: 'movies'})}>
        <Popcorn
          size={30}
          color={currentPath === 'movies' ? '#f97316' : '#ffffffc3'}
          weight="bold"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'myAccount'})}>
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
      </TouchableOpacity>
    </Box>
  );
}
