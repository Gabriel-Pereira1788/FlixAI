import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import {Heart} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {modalRef} from '../../../../../components/Modal/View';
import AddModal from '../AddModal/View';

interface HeaderProps {
  movie?: Movie;
}

export default function Header({movie}: HeaderProps) {
  function openModal() {
    if (movie) {
      modalRef.current?.show(() => <AddModal movie={movie} />, 'fade');
    }
  }
  return (
    <S.HStack
      zIndex={12}
      top={3}
      position="absolute"
      alignItems="center"
      justifyContent="flex-end"
      paddingRight={2}
      w="100%">
      <TouchableOpacity onPress={openModal}>
        <S.Circle width={10} height={10} backgroundColor="rgba(0,0,0,0.8)">
          <Heart size={25} color="#fff" weight="bold" />
        </S.Circle>
      </TouchableOpacity>
    </S.HStack>
  );
}
