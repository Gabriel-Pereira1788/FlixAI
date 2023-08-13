import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {SignOut} from 'phosphor-react-native';

import {Text} from '@components';

type Props = {
  handleSignOut: () => void;
};

export function MyAccountSignOut({handleSignOut}: Props) {
  return (
    <TouchableOpacity onPress={handleSignOut} style={$touchableBoxStyle}>
      <Text mr={'xs'} color="white" fontWeight={'500'} fontSize={30}>
        Sair
      </Text>
      <SignOut size={30} color="#fff" />
    </TouchableOpacity>
  );
}

const $touchableBoxStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: 20,
};
