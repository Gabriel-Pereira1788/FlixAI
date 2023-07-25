import React from 'react';
import {LibraryDTO, Movie} from '@models';
import {Alert, CardMovie, AlertRef} from '@components/molecules';
import {Box, Button, Text, InputAuth} from '@components/atoms';
import {modalRef} from '../Modal/View';

interface CreateLibraryProps {
  moviesListToAdd: Movie[];
  onCreate: (data: LibraryDTO) => Promise<void> | void;
}

export function CreateLibrary({moviesListToAdd, onCreate}: CreateLibraryProps) {
  const [titleLibrary, setTitleLibrary] = React.useState('');
  const alertRef = React.useRef<AlertRef>(null);

  async function handleCreate() {
    if (titleLibrary.trim() === '') {
      alertRef.current?.open({
        isOpen: true,
        text: 'Por favor preencha todos os campos.',
        status: 'warning',
      });
      return;
    }
    await onCreate({
      title: titleLibrary,
      movies: moviesListToAdd,
    });

    modalRef.current?.hide();
  }
  return (
    <>
      <Alert
        ref={alertRef}
        containerStyle={{
          top: 5,
        }}
      />
      <Box
        position="absolute"
        bottom={0}
        width="100%"
        height="80%"
        style={{
          backgroundColor: 'rgba(15, 15, 22, 1)',
        }}
        alignItems="flex-start"
        justifyContent="flex-start"
        borderTopStartRadius="xl"
        borderTopEndRadius="xl"
        padding={'l'}
        gap={'xs'}>
        <Text variant="titleLibrary">{titleLibrary}</Text>
        <Box
          width="100%"
          gap={'xs'}
          style={{
            marginBottom: 175,
          }}
          alignItems="center"
          justifyContent="center">
          {moviesListToAdd &&
            moviesListToAdd
              .slice(0, 3)
              .reverse()
              .map((data, index) => {
                return (
                  <CardMovie
                    key={data.id}
                    {...data}
                    containerStyle={{
                      flex: 1,
                      position: 'absolute',
                      zIndex: 1000,
                      left: Math.abs(index * 10),
                      top: Math.abs(index * 15),
                    }}
                  />
                );
              })}
        </Box>
        <InputAuth
          marginBottom="m"
          placeholder="Nome para a biblioteca..."
          value={titleLibrary}
          onChangeText={value => setTitleLibrary(value)}
        />
        <Button onPress={handleCreate}>Confirmar</Button>
      </Box>
    </>
  );
}
