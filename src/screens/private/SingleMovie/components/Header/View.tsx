import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import {Heart} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {modalRef} from '../../../../../components/Organisms/Modal/View';
import AddModal from '../AddModal/View';
import {useHeader} from './useHeader';
import RemoveModal from '../RemoveModal/View';
import {FindMovie, HeaderViewModel} from './model';

interface HeaderProps {
  movie?: Movie;
  useHeaderImpl?: HeaderViewModel;
  playlistImpl: FindMovie;
}

export default function Header({
  movie,
  useHeaderImpl = useHeader,
  playlistImpl,
}: HeaderProps) {
  const {haveInPlaylist, playlist} = useHeaderImpl({movie, playlistImpl});

  function openModal() {
    if (movie && !haveInPlaylist) {
      modalRef.current?.show(<AddModal movie={movie} />, 'fade');
    }

    if (haveInPlaylist && movie && playlist) {
      modalRef.current?.show(<RemoveModal movie={movie} playlist={playlist} />);
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
        <S.Circle
          testID="container-icon"
          width={10}
          height={10}
          backgroundColor="rgba(0,0,0,0.8)">
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
