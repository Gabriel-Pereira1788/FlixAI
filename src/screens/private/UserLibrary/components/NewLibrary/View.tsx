import React from 'react';
import * as S from 'native-base';
import {InputAuth, modalRef, Button} from '@components';

import {useNewLibrary as _useNewLibrary} from './useNewLibrary';
import Movies from '../Movies/View';
import {TouchableOpacity} from 'react-native';
import {NewLibraryViewModel} from './model';

interface NewLibraryProps {
  redirectScreen: () => void;
  useNewLibrary?: NewLibraryViewModel;
}

export default function NewLibrary({
  redirectScreen,
  useNewLibrary = _useNewLibrary,
}: NewLibraryProps) {
  const {popularMovies, titleLibrary, handleChangeText, createLibrary} =
    useNewLibrary({});

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
        Criar nova biblioteca
      </S.Text>
      <InputAuth
        placeholder="Nome para biblioteca"
        value={titleLibrary}
        onChangeText={handleChangeText}
      />

      <S.Text color="#ddd" fontSize="2xl" fontWeight={500}>
        Filmes populares.
      </S.Text>

      <S.Text color="#8b8b8b" fontSize="md" fontWeight={500}>
        Selecione algums filmes para continuar
      </S.Text>
      <S.HStack w="100%" alignItems="center" justifyContent="flex-end">
        <TouchableOpacity
          testID="button-redirect"
          onPress={handleRedirectScreen}>
          <S.Text color="orange.500" fontWeight={500}>
            ver todos
          </S.Text>
        </TouchableOpacity>
      </S.HStack>
      {popularMovies && <Movies movies={popularMovies} />}

      <Button onPress={createLibrary}>Confirmar</Button>
    </S.VStack>
  );
}