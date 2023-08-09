import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Movie} from '@models';
import {useNavigation} from '@react-navigation/native';
import * as S from 'native-base';

import {InputAuth, modalRef, Button} from '@components';

import {NewLibraryListMovies} from './components/NewLibraryListMovies';
import {ViewModel} from './types';

interface NewLibraryProps {
  viewModel: ViewModel;
  popularMovies: Movie[];
}

export function NewLibrary({viewModel, popularMovies}: NewLibraryProps) {
  const navigation = useNavigation();
  const {onCreateLibrary} = viewModel;

  const [titleLibrary, setTitleLibrary] = React.useState('');

  function handleRedirectScreen() {
    modalRef.current?.hide();
    navigation.navigate('SelectMovies');
  }

  async function handleCreateLibrary() {
    await onCreateLibrary(titleLibrary);
    modalRef.current?.hide();
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
        onChangeText={value => setTitleLibrary(value)}
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
      {popularMovies && <NewLibraryListMovies movies={popularMovies} />}

      <Button onPress={handleCreateLibrary}>Confirmar</Button>
    </S.VStack>
  );
}
