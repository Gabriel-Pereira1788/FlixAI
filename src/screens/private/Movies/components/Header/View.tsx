import React from 'react';

import * as S from 'native-base';
import {RenderIF} from '@components';
import {UserImpl, useUser as _useUser} from '@store';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserCircle} from 'phosphor-react-native';

type Props = {
  useUser?: UserImpl;
};

export default function Header({useUser = _useUser}: Props) {
  const {user} = useUser();
  return (
    <S.HStack
      w="100%"
      pt={10}
      pb={3}
      px={4}
      alignItems="center"
      justifyContent="space-between">
      <S.VStack space={2}>
        <S.Text color="#8e8888c3" fontSize="md">
          Olá {user && user.name}
        </S.Text>
        <S.Text color="#ffffffc3" fontWeight={500} fontSize="xl">
          Relaxe e escolha um filme...
        </S.Text>
      </S.VStack>
      <TouchableOpacity>
        <RenderIF
          condition={!!user && !!user.photoURL}
          AlternativeComponent={
            <UserCircle size={25} color="#fff" weight="bold" />
          }>
          <S.Image
            testID="image-user"
            source={{uri: !!user && user.photoURL ? user!.photoURL! : ''}}
            style={{
              width: 40,
              height: 40,
            }}
            rounded="full"
            alt="image-user"
          />
        </RenderIF>
      </TouchableOpacity>
    </S.HStack>
  );
}
