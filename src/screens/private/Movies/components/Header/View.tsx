import React from 'react';

import * as S from 'native-base';
import RenderIF from '../../../../../components/RenderIF/View';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserCircle} from 'phosphor-react-native';

type Props = {
  username: string;
};

export default function Header({username}: Props) {
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
          Olá {username}
        </S.Text>
        <S.Text color="#ffffffc3" fontWeight={500} fontSize="xl">
          Relaxe e escolha um filme...
        </S.Text>
      </S.VStack>
      <TouchableOpacity>
        <RenderIF
          condition={false}
          AlternativeComponent={
            <UserCircle size={25} color="#fff" weight="bold" />
          }>
          {/*     <S.Image
            source={{uri: !!user && user.photoURL ? user!.photoURL! : ''}}
            width={50}
            height={50}
            rounded="full"
            alt="image-user"
          /> */}
        </RenderIF>
      </TouchableOpacity>
    </S.HStack>
  );
}
