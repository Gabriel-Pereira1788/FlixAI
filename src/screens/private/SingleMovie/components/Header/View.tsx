import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import {Heart} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {modalRef} from '../../../../../components/Modal/View';
import AddModal from '../AddModal/View';
import {HeaderViewModel, useHeader} from './useHeader';
import RemoveModal from '../RemoveModal/View';

interface HeaderProps {
  movie?: Movie;
  useHeaderImpl?: HeaderViewModel;
}

export default function Header({
  movie,
  useHeaderImpl = useHeader,
}: HeaderProps) {
  const {haveInPlaylist, playlist} = useHeaderImpl({movie});

  function openModal() {
    if (movie && !haveInPlaylist) {
      modalRef.current?.show(() => <AddModal movie={movie} />, 'fade');
    }

    if (haveInPlaylist && movie && playlist) {
      modalRef.current?.show(() => (
        <RemoveModal movie={movie} playlist={playlist} />
      ));
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
          <Heart
            size={25}
            color="#fff"
            weight={haveInPlaylist ? 'fill' : 'bold'}
          />
        </S.Circle>
      </TouchableOpacity>
    </S.HStack>
  );
}
