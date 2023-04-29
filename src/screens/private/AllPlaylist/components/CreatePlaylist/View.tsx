import React from 'react';
import * as S from 'native-base';
import Input from '../../../../../components/Input/View';
import Button from '../../../../../components/Button/View';
import {useCreatePlaylist as _useCreatePlaylist} from './useCreatePlaylist';
import Movies from '../Movies/View';
import {TouchableOpacity} from 'react-native';
import {modalRef} from '../../../../../components/Modal/View';
import {CreatePlaylistViewModel} from './model';
interface CreatePlaylistProps {
  redirectScreen: () => void;
  useCreatePlaylist?: CreatePlaylistViewModel;
}

export default function CreatePlaylist({
  redirectScreen,
  useCreatePlaylist = _useCreatePlaylist,
}: CreatePlaylistProps) {
  const {popularMovies} = useCreatePlaylist();

  function handleRedirectScreen() {
    modalRef.current?.hide();
    redirectScreen();
  }
  return (
    <S.VStack
      position="absolute"
      bottom={0}
      w="100%"
      h="90%"
      backgroundColor="rgba(15, 15, 22, 1)"
      alignItems="flex-start"
      justifyContent="flex-start"
      borderTopRadius={50}
      p={9}
      space={4}>
      <S.Text color="#ddd" fontSize="2xl" fontWeight={500}>
        Criar nova playlist
      </S.Text>
      <Input placeholder="Nome para playlist" />

      <S.Text color="#ddd" fontSize="2xl" fontWeight={500}>
        Escolha alguns filmes
      </S.Text>
      <S.HStack w="100%" alignItems="center" justifyContent="flex-end">
        <TouchableOpacity onPress={handleRedirectScreen}>
          <S.Text color="orange.500" fontWeight={500}>
            ver todos
          </S.Text>
        </TouchableOpacity>
      </S.HStack>
      {popularMovies && <Movies movies={popularMovies} />}

      <Button>Confirmar</Button>
    </S.VStack>
  );
}
