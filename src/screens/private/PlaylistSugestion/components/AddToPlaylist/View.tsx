import React from 'react';
import * as S from 'native-base';
import {Plus} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';

interface AddToPlaylistProps {
  onPress?: () => void;
}

export default function AddToPlaylist({onPress}: AddToPlaylistProps) {
  return (
    <TouchableOpacity testID="button" onPress={onPress}>
      <S.Circle testID="plus-icon" p={5} overflow="hidden">
        <BlurView style={style.blurContainer} blurType="dark" blurAmount={20} />
        <Plus size={25} color="#f97316" weight="bold" />
      </S.Circle>
    </TouchableOpacity>
  );
}

export const style = StyleSheet.create({
  blurContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
