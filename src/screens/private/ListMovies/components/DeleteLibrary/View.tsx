import React from 'react';

import {useRealm, Playlist} from '@database';
import {useAlertStore} from '@store';
import * as S from 'native-base';

import {Alert, modalRef, Button} from '@components';

interface DeleteLibraryProps {
  library: (Playlist & Realm.Object<Playlist, never>) | null;
  goBack(): void;
  useRealmImpl?: () => Realm;
}

export default function DeleteLibrary({
  library,
  goBack,
  useRealmImpl = useRealm,
}: DeleteLibraryProps) {
  const realm = useRealmImpl();
  const {success} = useAlertStore();

  function confirmDelete() {
    realm.write(() => {
      realm.delete(library);
      success('Biblioteca apagada...');

      goBack();
      modalRef.current?.hide();
    });
  }
  return (
    <>
      <Alert />
      <S.VStack
        alignItems="center"
        justifyContent="center"
        w={'80%'}
        backgroundColor="background.main"
        space={5}
        padding={6}
        borderRadius={10}>
        <S.Text color="green.200" fontWeight={500} fontSize="3xl">
          {library?.title ?? ''}
        </S.Text>
        <Button onPress={confirmDelete}>Confirmar</Button>
      </S.VStack>
    </>
  );
}
