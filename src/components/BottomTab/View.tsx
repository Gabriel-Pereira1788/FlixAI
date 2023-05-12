import React from 'react';
import * as S from 'native-base';
import {
  MagnifyingGlass,
  Queue,
  Popcorn,
  UserCircle,
} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface BottomTabProps extends S.IStackProps {
  currentPath: 'sugestions' | 'allPlaylist' | 'movies';
}

export default function BottomTab({currentPath, ...rest}: BottomTabProps) {
  const navigation = useNavigation();
  return (
    <S.HStack
      position="absolute"
      bottom={0}
      w="100%"
      px={1}
      py={4}
      alignItems="center"
      backgroundColor="rgba(0,0,0,0.8)"
      justifyContent="center"
      space={7}
      {...rest}>
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
        testID="allPlaylistId"
        onPress={() => navigation.navigate('Home', {screen: 'allPlaylist'})}>
        <Queue
          size={30}
          color={currentPath === 'allPlaylist' ? '#f97316' : '#ffffffc3'}
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
        <UserCircle size={30} color={'#ffffffc3'} weight="bold" />
      </TouchableOpacity>
    </S.HStack>
  );
}
