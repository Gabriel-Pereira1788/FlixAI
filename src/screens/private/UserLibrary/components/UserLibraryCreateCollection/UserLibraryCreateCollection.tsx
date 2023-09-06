import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useCollectionCreate} from '@database';
import {
  useMoviesByGenre,
  useSelectedMoviesStore,
  useToastActions,
} from '@store';

import {InputAuth, modalRef, Button, Box, Text} from '@components';

import {UserLibraryCreateCollectionList} from './components/UserLibraryCreateCollectionList';

interface NewLibraryProps {
  redirectToSelectMovies: () => void;
}

export function UserLibraryCreateCollection({
  redirectToSelectMovies,
}: NewLibraryProps) {
  const selectedMovies = useSelectedMoviesStore();
  const toast = useToastActions();
  const {data: popularMovies} = useMoviesByGenre('popular');

  const {createNewCollection} = useCollectionCreate({
    onSuccess: () => {
      toast.success('Criado com sucesso!');
      modalRef.current?.hide();
    },
  });

  const [titleLibrary, setTitleLibrary] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleCreateCollection() {
    if (!titleLibrary.trim()) {
      setError('Por favor insira um titulo valido para continuar');
      return;
    }
    await createNewCollection(titleLibrary, selectedMovies);
  }

  return (
    <Box
      position="absolute"
      bottom={0}
      width="100%"
      height="90%"
      backgroundColor="background"
      alignItems="flex-start"
      justifyContent="flex-start"
      borderRadius={'m'}
      p={'m'}
      gap={'l'}>
      <Text marginTop="m" color="gray" fontSize={20} fontWeight="500">
        Criar nova biblioteca
      </Text>
      {/* <S.Text color="#ddd" fontSize="2xl" fontWeight={500}>
      </S.Text> */}
      <InputAuth
        error={error}
        placeholder="Nome para biblioteca"
        value={titleLibrary}
        onChangeText={value => setTitleLibrary(value)}
      />

      <Text marginTop="m" color="gray" fontSize={20} fontWeight="500">
        Filmes populares
      </Text>

      <Text color="grayDarkTextColor" fontSize={15} fontWeight={'500'}>
        Selecione algums filmes para continuar
      </Text>
      <Box
        flexDirection="row"
        width="100%"
        alignItems="center"
        justifyContent="flex-end">
        <TouchableOpacity
          testID="button-redirect"
          onPress={redirectToSelectMovies}>
          <Text color="orange" fontWeight={'500'}>
            ver todos
          </Text>
        </TouchableOpacity>
      </Box>
      {popularMovies && (
        <UserLibraryCreateCollectionList movies={popularMovies} />
      )}

      <Button onPress={handleCreateCollection}>Confirmar</Button>
    </Box>
  );
}
